import json, re
from docx import Document

DOC_FILE = "Big_Five_Archetypes_243_FULL.docx"
OUT_FILE = "archetypes_full.json"

def build_json_from_docx():
    print(f"Reading {DOC_FILE} ...")
    doc = Document(DOC_FILE)
    text_blocks = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

    data = {}
    current = None
    section_title = None
    section_data = {}

    # Recognize archetype headers and section headings
    for line in text_blocks:
        if re.match(r"^Openness:", line):
            # Save previous archetype
            if current:
                data[current] = {
                    "traits": traits,
                    "sections": section_data
                }
                section_data = {}
            # Parse the new archetype header
            traits_line = line
            parts = re.findall(r"(Low|Medium|High)", line)
            if len(parts) == 5:
                traits = " | ".join(parts)
            current = line.split("—")[-1].replace("Archetype:", "").strip()
        elif re.match(r"^[A-Z][A-Za-z ]+$", line) and len(line.split()) < 8:
            section_title = line
            section_data[section_title] = ""
        elif section_title:
            section_data[section_title] += line + "\n"

    # Save last archetype
    if current:
        data[current] = {
            "traits": traits,
            "sections": section_data
        }

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ Created {OUT_FILE} with {len(data)} archetypes.")

if __name__ == "__main__":
    build_json_from_docx()