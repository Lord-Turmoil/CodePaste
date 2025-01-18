"""
This script is used to generate the private HTML files in
GitHub actions. The HTML files are stored in the environment.
"""

import os

notification = os.environ["NOTIFICATION"]
statistics = os.environ["STATISTICS"]
support = os.environ["SUPPORT"]

assert notification is not None
assert statistics is not None
assert support is not None

print("Generating HTML files...")
with open("src/views/components/notification.html", "w", encoding="utf-8") as f:
    f.write(notification)
with open("src/views/components/statistics.html", "w", encoding="utf-8") as f:
    f.write(statistics)
with open("src/views/components/support.html", "w", encoding="utf-8") as f:
    f.write(support)
print("HTML files generated.")
