import $ from "~/vendor/jquery-extensions";
import paste from "~/paste";

var help = $("#help");
var isHelpOn = false;   // used in help
help.click(function () {
    help.toggleClass("active");
    isHelpOn = !isHelpOn;
    toggleHelp();
});

var cover = $("div.cover");
var showHelp = true;
var interval = null;
function toggleHelp() {
    var show = (paste.isEmpty() || isHelpOn);
    if (show === showHelp) {
        return;
    }

    showHelp = show;
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }
    cover.removeClassRegex("animate__*");
    if (showHelp) {
        cover.addClass("animate__animated animate__fadeIn");
        cover.show();
    } else {
        cover.addClass("animate__animated animate__fadeOut");
        interval = setTimeout(function () {
            cover.hide();
        }, 500);
    }
}

// Close help if it is on when paste is made.
function closeHelp() {
    if (isHelpOn) {
        help.click();
    }
}

export { toggleHelp, closeHelp };