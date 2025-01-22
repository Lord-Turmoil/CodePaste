"""
This script load all languages and generate necessary files for the app.
"""

import json
import os
import yaml

CONFIG_FILE = "languages/lang.yml"
SAMPLES_DIR = "languages/samples"
SAMPLES_JS = "src/js/samples.js"
OPTIONS_HTML = "src/views/components/languages.html"

with open(CONFIG_FILE, "r") as f:
    CONFIG = yaml.safe_load(f)

LANGUAGES = []
SAMPLES = {}
for section in CONFIG:
    optgroup = {"label": section, "options": []}
    for language in CONFIG[section]:
        key, value = language.split(" ")
        optgroup["options"].append({"value": key, "text": value})
        with open(os.path.join(SAMPLES_DIR, f"{key}.txt"), "r") as f:
            SAMPLES[key] = f.read()
    LANGUAGES.append(optgroup)

# Generate samples.js
with open(SAMPLES_JS, "w") as f:
    # write the list of languages
    f.write("const CODE_SET = {\n")
    for sample in SAMPLES:
        f.write(f"    {sample}: {json.dumps(SAMPLES[sample])},\n")
    f.write("};\n")
    f.write("export default CODE_SET;\n")

# Generate languages.html
with open(OPTIONS_HTML, "w") as f:
    for optgroup in LANGUAGES:
        f.write(f"<optgroup label='{optgroup['label']}'>\n")
        for option in optgroup["options"]:
            f.write(
                f"    <option value='{option['value']}'>{option['text']}</option>\n"
            )
        f.write("</optgroup>\n")
