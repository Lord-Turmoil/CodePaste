import $ from "~/vendor/jquery-extensions";

// auto-fit text area
// Reference: https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 600;

function registerOnTextAreaChange() {
    $("textarea").each(function () {
        this.setAttribute("style", "height:" + (MIN_HEIGHT) + "px;");
    }).on("input", function () {
        this.style.height = "auto";
        var targetHeight = this.scrollHeight;
        if (targetHeight > MAX_HEIGHT) {
            $(this).addClass('full');
            targetHeight = MAX_HEIGHT;
        } else {
            $(this).removeClass('full');
            if (targetHeight < MIN_HEIGHT) {
                targetHeight = MIN_HEIGHT;
            }
        }
        this.style.height = (targetHeight) + "px";
    });
}

function registerEditListeners() {
    // TODO: Using shift-tab to unindent
    // FIXME: This will empty the edit history
    $("textarea").on("keydown", function (e) {
        if (e.key == 'Tab') {
            e.preventDefault();

            var start = this.selectionStart;
            var end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = this.value.substring(0, start) +
                "    " + this.value.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });
}

function registerListeners() {
    registerOnTextAreaChange();
    registerEditListeners();
}

export { registerListeners };