"""
This script is used to auto rename bundle.js to bundle.[hash].js
"""

import os
import sys

html_file = os.path.abspath("dist/index.html")
bundle_file = os.path.abspath("dist/bundle.js")

if not os.path.exists(html_file):
    print(f"Error: {html_file} not found.")
    sys.exit(1)

if not os.path.exists(bundle_file):
    print(f"Error: {bundle_file} not found.")
    sys.exit(1)

# get a random hash
hash = os.urandom(4).hex()

# rename bundle.js to bundle.[hash].js
os.rename(bundle_file, os.path.join(os.path.dirname(bundle_file), f"bundle.{hash}.js"))

# replace bundle.js with bundle.[hash].js in the HTML file
with open(html_file, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("bundle.js", f"bundle.{hash}.js")
with open(html_file, "w", encoding="utf-8") as f:
    f.write(content)
