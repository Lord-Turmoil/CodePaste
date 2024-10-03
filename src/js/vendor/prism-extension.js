import $ from "./jquery-extensions";

const themes = {
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/{id}.min.css": [
        "prism",
        "prism-dark",
        "prism-funky",
        "prism-okaidia",
        "prism-twilight",
        "prism-solarizedlight",
        "prism-tomorrow"
    ],
    "https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-{id}.min.css": [
        "a11y-dark",
        "atom-dark",
        "base16-ateliersulphurpool.light",
        "cb",
        "coldark-cold",
        "coldark-dark",
        "coy-without-shadows",
        "darcula",
        "dracula",
        "duotone-dark",
        "duotone-earth",
        "duotone-forest",
        "duotone-light",
        "duotone-sea",
        "duotone-space",
        "ghcolors",
        "gruvbox-dark",
        "gruvbox-light",
        "holi-theme",
        "hopscotch",
        "lucario",
        "material-dark",
        "material-light",
        "material-oceanic",
        "night-owl",
        "nord",
        "one-dark",
        "one-light",
        "pojoaque",
        "shades-of-purple",
        "solarized-dark-atom",
        "synthwave84",
        "vs",
        "vsc-dark-plus",
        "xonokai",
        "z-touch"
    ]
}


//url for id from dictionary
function getThemeUrl(id) {
    for (const [key, value] of Object.entries(themes)) {
        if (value.includes(id)) return key;
    }
    return null
}

function setTheme(id) {
    let url = getThemeUrl(id)
    if (url == null) return null

    let theme_url = url.replace(/\{id}/g, id);
    $('#theme').attr('href', theme_url)

    localStorage.setItem("theme", id);
};

export { setTheme };
