import os

# replace absolute path with relative path in index.html
print('Replacing absolute path with relative path in index.html...')
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('"/', '"')
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
print()

# deploy to GitHub Pages
print('Deploying to GitHub Pages...')
os.system('git add .')
os.system('git commit -m "deploy"')
os.system('git push origin delpoy')
print('Done!')
