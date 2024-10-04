import $ from "~/vendor/jquery-extensions";
import alertify from "~/vendor/alertify-extension";
import { toggleHelp, closeHelp } from "~/events/help";
import paste from "~/paste";
import codeset from "~/code";

function registerActions() {
    $("div.action").each(function () {
        $(this).on("animationend", () => {
            $(this).removeClassRegex("animate__*");
        });
    });

    var convertButton = $("#convert");
    convertButton.on("click", () => {
        convertButton.addClass("animate__animated animate__spin");

        updateLanguage(true);
        paste.dispatch("make");
        closeHelp();
        toggleHelp();
    });

    var eraseButton = $("#erase");
    eraseButton.on("click", () => {
        eraseButton.addClass("animate__animated animate__shake");
        paste.dispatch("erase");
        toggleHelp();
    });

    var copyButton = $("#copy");
    copyButton.on("click", () => {
        copyButton.addClass("animate__animated animate__grow");
        paste.dispatch("copy");
    });

    var randomButton = $("#random");
    randomButton.on("click", () => {
        randomButton.addClass("animate__animated animate__rubber");
        makeRandomPaste(null);
    });

    $("#logo").on("click", () => {
        promptNotification();
    });

    registerSupport();
}

function updateLanguage(persist) {
    const optionSelected = $("#lang").find("option:selected");
    updateActiveLanguage(optionSelected.val(), persist);
    updateLanguageTip(optionSelected.text());
}

function updateActiveLanguage(lang, persist) {
    $("#code").removeClass().addClass("language-" + lang);
    if (persist) {
        localStorage.setItem("language", lang);
    }
}

function updateLanguageTip(lang) {
    var tip = $("div.toolbar-item span");
    if (tip.length) {
        tip.text(lang);
    }
}

function registerSupport() {
    var supportButton = $("#coffee");
    var support = $("#support");
    if (support.children().length !== 1) {
        supportButton.remove();
        return;
    }
    const html = support.html();
    supportButton.on("click", () => {
        supportButton.addClass("animate__animated animate__grow");
        alertify.alert("Buy me a coffee 🍵", html);
    });
}

function makeRandomPaste(lang) {
    if (lang === null) {
        const optionSelected = $("#lang").find("option:selected");
        const current = optionSelected.val();
        lang = codeset.getRandomLanguage(current);
    }
    paste.setInput(codeset.getCode(lang));

    $("option[value=\"" + lang + "\"]").prop("selected", true);
    updateLanguage(false);

    paste.dispatch("random");
    closeHelp();
    toggleHelp();
}

function promptNotification() {
    const agreement = $("#notification");
    if (agreement.children().length === 1) {
        const html = agreement.html();
        alertify.alert("Notification 🔔", html);
    }
}

export { registerActions, makeRandomPaste, promptNotification };
