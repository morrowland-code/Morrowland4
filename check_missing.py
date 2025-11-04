from docx import Document
import re, json

# Load your full reference set (should contain all 243 combos)
with open("archetypes_full.json", "r", encoding="utf-8") as f:
    full_map = json.load(f)
all_expected = set(full_map.keys())

# Parse your DOCX just like the app does
doc = Document("morrowland 243.docx")
lines = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

header_re = re.compile(
    r"(?i)openness\s*:\s*(low|medium|high).*?"
    r"conscientiousness\s*:\s*(low|medium|high).*?"
    r"extraversion\s*:\s*(low|medium|high).*?"
    r"agreeableness\s*:\s*(low|medium|high).*?"
    r"neuroticism\s*:\s*(low|medium|high)"
)

found = set()
for line in lines:
    m = header_re.search(line)
    if m:
        code = "-".join(x.capitalize() for x in m.groups())
        found.add(code)

missing = sorted(all_expected - found)
extra = sorted(found - all_expected)

print(f"✅ Found {len(found)} headers")
print(f"❌ Missing {len(missing)} archetypes:\n", missing)
print(f"⚠️ Extra / mistyped {len(extra)} headers:\n", extra)