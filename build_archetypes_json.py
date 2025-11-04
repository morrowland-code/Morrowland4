# build_archetypes_json.py
import json, re, os
from docx import Document

DOCX = "Big_Five_Archetypes_243 (1).docx"
OUT = "archetypes_full.json"

pat = re.compile(
    r"Openness:\s*(Low|Medium|High)\s*\|\s*"
    r"Conscientiousness:\s*(Low|Medium|High)\s*\|\s*"
    r"Extraversion:\s*(Low|Medium|High)\s*\|\s*"
    r"Agreeableness:\s*(Low|Medium|High)\s*\|\s*"
    r"Neuroticism:\s*(Low|Medium|High)\s*—\s*Archetype:\s*([A-Za-z][A-Za-z0-9\-\s]+)"
)

if not os.path.exists(DOCX):
    raise SystemExit(f"Could not find {DOCX} in: {os.getcwd()}")

doc = Document(DOCX)
mapping = {}

for p in doc.paragraphs:
    m = pat.search(p.text)
    if m:
        O,C,E,A,N,name = m.groups()
        key = f"{O}-{C}-{E}-{A}-{N}"
        mapping[key] = name.strip()

if len(mapping) != 243:
    print(f"Warning: found {len(mapping)} entries (expected 243).")
else:
    print("✓ Found all 243 entries.")

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(mapping, f, ensure_ascii=False, indent=2)

print(f"✓ Wrote {OUT} in {os.getcwd()}")