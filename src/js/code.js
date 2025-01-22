import CODE_SET from "~/samples.js";

class CodeSet {
    constructor(code) {
        this.code = code;
        this.count = Object.keys(code).length;
    }

    /**
     * Get a random language code.
     * @param {string} avoid the language to avoid
     */
    getRandomLanguage(avoid) {
        if (avoid === null) {
            avoid = "";
        }
        var lang = this.nextRandomLanguage();
        while (lang === avoid) {
            lang = this.nextRandomLanguage();
        }
        return lang;
    }

    /**
     * Get the code for the given language.
     * @param {string} lang the language of the code
     * @returns the code, or dummy if language not available
     */
    getCode(lang) {
        if (this.hasLanguage(lang)) {
            return this.code[lang];
        }
        return "Oops, write your own code!";
    }

    hasLanguage(lang) {
        return Object.prototype.hasOwnProperty.call(this.code, lang);
    }

    nextRandomLanguage() {
        const target = Math.floor(Math.random() * this.count);
        var i = 0;
        for (const key of Object.keys(this.code)) {
            if (i === target) {
                return key;
            }
            i++;
        }
    }
};

const codeset = new CodeSet(CODE_SET);

export default codeset;
