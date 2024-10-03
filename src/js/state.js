import $ from "./vendor/jquery-extensions";
import { makeRandomPaste } from "~/events/actions";
import { setMode, updateLineNumber } from "~/events/options";
import alertify from "~/vendor/alertify-extension"
import { getCookie, setCookie } from "./vendor/cookie-extension";

function restoreUserPreferences() {
    restoreLanguage();
    restoreLineNumber();
    restoreColorMode();
    promptAgreement();
}

function restoreLanguage() {
    const lang = localStorage.getItem('language');
    if (lang) {
        setTimeout(function () {
            makeRandomPaste(lang);
        }, 1000);
    } else {
        setTimeout(function () {
            makeRandomPaste(null);
        }, 1000);
    }
}

function restoreLineNumber() {
    const enableLineNumber = localStorage.getItem("line-number");
    if (enableLineNumber !== null) {
        updateLineNumber(enableLineNumber === 'true');
    }
}

function restoreColorMode() {
    const mode = localStorage.getItem("mode");
    if (mode !== null) {
        const isDark = localStorage.getItem("mode") === "dark";
        setMode(isDark);
    }
}

function promptAgreement() {
    const agreement = $('#agreement');
    const cookie = getCookie("agreement");
    if (cookie !== "") {
        return;
    }
    setCookie("agreement", "agreed", 24 * 7);   // one week

    if (agreement.children().length === 1) {
        const html = agreement.html();
        alertify.alert("Notification 🔔", html);
    }
}

export { restoreUserPreferences };
