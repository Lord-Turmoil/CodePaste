# Code Paste

Copyright &copy; Tony's Studio 2023 - 2025

---

## Description

This tool provides you the ability to create highlighted code for Microsoft Office, mainly for Word and PowerPoint. You can use it to create a beautiful code block in your document or presentation.

### Try it now!

- [Code Paste on Tony's Studio](https://paste.tonys-studio.top/)
- [Code Paste on GitHub Page](https://lord-turmoil.github.io/CodePaste/)

---

## Development

If you find Code Paste useful and want to host it on your website, this section will be useful.

> **NOTICE:** I'm glad some of you have already hosted Code Paste on you own server, but forgot to remove the analytics scripts and my COS links. It's partly due to my bad project structure, so I refactored it to separate these configurations. Besides, **I would appreciate it if you mention my repository in your website**.🙏

Feel free to contribute to this project. You can report bugs, suggest new features, or even submit a pull request. 😊

### Quick Start

Code Paste is written in native HTML, CSS and JavaScript with npm and Webpack. Also with posthtml for the `<module>` tag. To start development, clone the repo first, then install required packages.

```bash
npm install
npm run init  # initialize placeholder
```

Then, you can run the project. There are three options for this.

```bash
npm run build  # build for production
npm run dev    # build for development
npm run watch  # build for development and watch for changes
```

> To preview the project locally, I recommend using [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) plugin for Visual Studio Code. Just open `dist/index.html` after your local server is on.

### Customization

Since I removed sensitive information from the project, you need to run `npm run init` to create placeholder files even if you don't need them. They are under `src/views/components/`, where you can find a `.gitignore` that ignores them.

**Analytics**

In file `statistics.html`, and place all your scripts into it. If you don't need them, just leave this file empty. The file should look like this.

```html
<!-- Clarity -->
<script type="text/javascript">
    (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "***key***");
</script>
<!-- Baidu Statistics -->
<script>
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?******key*******";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
```

**Notification**

For users who visit your website for the first time, you may want to prompt a notice or agreement. In `notification.html`, write your custom `<div>` for it. The default class for it is `notification`, you can change it and add your own CSS style.

```html
<div class="notification">
    <p>Greetings from all members of Tony's Studio!</p>
</div>
```

**Support**

If you want to add a support page, write it in `support.html`. Like notification, the default class for it is `coffee` and you can customize it. If you add this, there will be an extra support button in the center of the page.

```html
<div class="coffee">
    <img src="url or local path" alt="WeChat Pay" title="Scan to support me">
    <p>We appreciate your sponsorship!🌹</p>
</div>
```

### Self-hosting

There is still one step before you can host Code Paste on your website. I use [Font Awesome](https://fontawesome.com/) for lovely icons, and the linked JavaScript only works for my domain. Therefore, you have to get your kit [here](https://fontawesome.com/kits) and replace the link in `src/views/components/head.html`.

After all these are done, just copy `dist` folder to your server and enjoy!🎉

---

## Sponsors 💖

Here, I would like to express my sincere gratitude for all who sponsor Code Paste. THANK YOU! 🥰

> I may not be able to know your GitHub account from the payment. If you bought me a coffee but are not present in the following table, feel free to contact me via E-mail.🙏

<table>
    <tbody>
        <tr>
            <td align="center" valign="top" width="14.28%">
                <a href="https://github.com/AkashiSensei"><img src="https://avatars.githubusercontent.com/u/78262426?s=100" width="100px;" alt="Liu Yizhou"/></a>
                <br />
                <sub><b>Liu Yizhou</b></sub>
            </td>
            <td align="center" valign="top" width="14.28%">
                <a href="https://github.com/hongshuobuaa"><img src="https://avatars.githubusercontent.com/u/117986926?s=100" width="100px;" alt="hongshuobuaa"/></a>
                <br />
                <sub><b>hongshuobuaa</b></sub>
            </td>
            <td align="center" valign="top" width="14.28%">
                <a href="https://github.com/CR-1201"><img src="https://avatars.githubusercontent.com/u/112941971?s=100" width="100px;" alt="秋子夜"/></a>
                <br />
                <sub><b>秋子夜</b></sub>
            </td>
            <td align="center" valign="top" width="14.28%">
                <a href="https://github.com/GuoLan-Fruket"><img src="https://avatars.githubusercontent.com/u/109665787?s=100" width="100px;" alt="GuoLan-Fruket"/></a>
                <br />
                <sub><b>GuoLan-Fruket</b></sub>
            </td>
        </tr>
    </tbody>
</table>
