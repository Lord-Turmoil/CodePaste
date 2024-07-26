# Code Paste

Copyright &copy; Tony's Studio 2023

---

## Description

This tool provides you the ability to create highlighted code for Microsoft Office, mainly for Word and PowerPoint. You can use it to create a beautiful code block in your document or presentation.

### Try it!

- [Code Paste on Tony's Studio](https://paste.tonys-studio.top/)
- [Code Paste on GitHub Page](https://lord-turmoil.github.io/CodePaste/)

## Instruction

Copy your code to the input panel, select language, and then click "mix". Then you can simply copy the result to Word or PowerPoint with beautiful format. 😍

You can also select different color schemes to better fit your document or presentation. 😆

What's more, you can preview the effect with the sample code we provided. 😎

## Trivial

You know, 'paste' can be a noun, so I used a pun here. So... Mix your code to a yummy paste! 😋

## Contributing

Feel free to contribute to this project. You can report bugs, suggest new features, or even submit a pull request. 😊

### Development

> I'm a Windows player so... the scripts are all `.bat` files. 🥺

This project is written in native HTML, CSS, and JavaScript. You can clone the repository and open `res/index.html` in your browser to run the project locally.

> Here I recommend using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in Visual Studio Code to run the project.

For production release, there is `minify.bat`, which will produce a minified version of the project in `dist` folder, which is ready for publishing. To use it, you need the following dependencies. Some can be installed with `npm install`.

- [HTMLMinifier](https://github.com/kangax/html-minifier)
- [cssnano](https://github.com/cssnano/cssnano)
- [UglifyJS](https://github.com/mishoo/UglifyJS)
- Python (to minify JSON)

To be more specific, you can install the dependencies with the following commands.

```powershell
npm install
npm install html-minifier -g
npm install uglify-js -g
```
