import { makeRandomPaste, promptNotification } from "~/events/actions";
import { setMode, updateLineNumber } from "~/events/options";
import { getCookie, setCookie } from "./vendor/cookie-extension";
import { setTheme } from "~/vendor/prism-extension";

function restoreUserPreferences() {
    restoreColorMode();
    restoreLanguage();
    restoreLineNumber();
    restoreTheme();
    restoreNotification();
}

function restoreLanguage() {
    const lang = localStorage.getItem("language");
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
        updateLineNumber(enableLineNumber === "true");
    }
}

function restoreColorMode() {
    const mode = localStorage.getItem("mode");
    if (mode !== null) {
        const isDark = localStorage.getItem("mode") === "dark";
        setMode(isDark);
    }
}

function restoreTheme() {
    const theme = localStorage.getItem("theme");
    if (theme !== null) {
        setTheme(theme);
    }
}

function restoreNotification() {
    const cookie = getCookie("notification");
    if (cookie !== "") {
        return;
    }
    setCookie("notification", "notified", 24 * 7);   // one week
    
    promptNotification();
}

export { restoreUserPreferences };
