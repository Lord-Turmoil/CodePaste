# Minify JSON
# Usage: python minify_json.py <input_file> <output_file>

import json
import sys


def minify_json(input_file, output_file):
    with open(input_file, "r") as f:
        data = json.load(f)
    with open(output_file, "w") as f:
        json.dump(data, f, separators=(",", ":"))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python minify_json.py <input_file> <output_file>")
        sys.exit(1)
    minify_json(sys.argv[1], sys.argv[2])
