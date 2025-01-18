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
            $(this).addClass("full");
            targetHeight = MAX_HEIGHT;
        } else {
            $(this).removeClass("full");
            if (targetHeight < MIN_HEIGHT) {
                targetHeight = MIN_HEIGHT;
            }
        }
        this.style.height = (targetHeight) + "px";
    });
}

function prepareIndentation(textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const lines = textarea.value.split("\n");

    let affectedLines = [];
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
        const lstart = count;
        const lend = count + lines[i].length + 1;
        if (lstart <= end && lend > start) {
            affectedLines.unshift({ line: i, start: lstart, end: lend });
        }
        count = lend;
    }

    return { start: start, end: end, affectedLines: affectedLines };
}

function registerEditListeners() {
    $("textarea").on("keydown", function (e) {
        if (e.key == "Tab") {
            e.preventDefault();
            $(this).trigger(e.shiftKey ? "unindent" : "indent", [prepareIndentation(this)]);
        }
    }).on("indent", function (event, data) {
        if (data.start == data.end) {
            document.execCommand("insertText", false, "    ");
            this.setSelectionRange(data.start + 4, data.start + 4);
            return;
        }

        for (let i = 0; i < data.affectedLines.length; i++) {
            const line = data.affectedLines[i];
            this.setSelectionRange(line.start, line.start);
            document.execCommand("insertText", false, "    ");
        }
        this.setSelectionRange(data.start + 4, data.end + 4 * data.affectedLines.length);
    }).on("unindent", function (event, data) {
        let newStart = data.start;
        let newEnd = data.end;

        for (let i = 0; i < data.affectedLines.length; i++) {
            const line = data.affectedLines[i];
            const start = line.start;
            let end = start;
            while (((end < line.end) && (end - start < 4)) && (this.value[end] == " ")) {
                end++;
            }

            if (i == data.affectedLines.length - 1) {
                newStart -= end - start;
                newStart = Math.max(newStart, line.start);
            }
            newEnd -= end - start;
            console.log(newStart, newEnd, line.start, end - start);

            if (end > start) {
                this.setSelectionRange(start, end);
                document.execCommand("delete");
            }
        }
        this.setSelectionRange(newStart, Math.max(newStart, newEnd));
    }).on("paste", function (e) {
        e.preventDefault();
        // This is a bug when copying from PowerPoint, where '\n' is
        // replaced with '\v' (vertical tab) and ' ' is replaced with '\xa0' (non-breaking space)
        const text = e.originalEvent.clipboardData.getData("text")
            .replaceAll(String.fromCharCode(11), "\n")
            .replaceAll(String.fromCharCode(160), " ");
        document.execCommand("insertText", false, text);
    });
}

function registerListeners() {
    registerOnTextAreaChange();
    registerEditListeners();
}

export { registerListeners };