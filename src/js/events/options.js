import $ from "~/vendor/jquery-extensions";
import paste from "~/paste";
import { closeHelp, toggleHelp } from "./help";
import { setTheme } from "~/vendor/prism-extension";

var isDark = false;

function registerOptions() {
    $("#cb3-8").on("change", function () {
        updateLineNumber(this.checked);
        paste.dispatch('refresh');
        closeHelp();
        toggleHelp();
    });

    $('#theme-selector').change(function () {
        setTheme(this.value)
    })

    var mode = $('#mode');
    mode.click(function () {
        setMode(!isDark);
    });
}

function updateLineNumber(enable) {
    if (enable) {
        $('#pre').addClass('line-numbers');
        $("#cb3-8").get(0).checked = true;
    } else {
        $('#pre').removeClass('line-numbers');
    }
    paste.enableLineNumber(enable);
    localStorage.setItem("line-number", enable);
}

function setMode(dark) {
    isDark = dark;
    if (isDark) {
        $('#mode').addClass('active');
    } else {
        $('#mode').removeClass('active');
    }
    applyMode();
}

function applyMode() {
    if (isDark) {
        $('#mode-css').attr('href', "css/dark.css");
        localStorage.setItem("mode", "dark");
    } else {
        $('#mode-css').attr('href', "");
        localStorage.setItem("mode", "light");
    }
}

export { registerOptions, updateLineNumber, setMode };
