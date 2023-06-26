function removeClassRegex(pattern) {
    var element = $(this);
    var classNames = element.attr('class').split(' ');
    $(classNames).each(function (key, value) {
        if (value.match(pattern)) {
            element.removeClass(value);
        }
    });
}

$.fn.removeClassRegex = function (pattern) {
    var element = $(this);
    var classNames = element.attr('class').split(' ');
    $(classNames).each(function (key, value) {
        if (value.match(pattern)) {
            element.removeClass(value);
        }
    });
}

// replace spaces with &nbsp; in string form html while skipping tags
// here we assume that the string is legal
function normalizeString(str) {
    var res = "";
    var length = str.length;
    var cnt = 0;

    for (var i = 0; i < length; i++) {
        if (str[i] === ' ') {
            res += (cnt === 0) ? '&nbsp;' : ' ';
        } else {
            res += str[i];
            if (str[i] === '<') {
                cnt++;
            } else if (str[i] === '>') {
                cnt--;
            }
        }
    }

    return res;
}

// copy html element while preserving the format and style
// Reference: https://htmldom.dev/copy-highlighted-code-to-the-clipboard/
function copyHTMLElement(elem) {
    // Create new selection
    const selection = window.getSelection();

    // Save the current selection
    const currentRange = (selection.rangeCount === 0) ? null : selection.getRangeAt(0);

    // Select the text content of code element
    const range = document.createRange();
    range.selectNodeContents(elem);
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy to the clipboard
    var hasError = false;
    try {
        document.execCommand('copy');
    } catch (err) {
        // Unable to copy
        console.log(err);
        hasError = true;
    } finally {
        // Restore the previous selection
        selection.removeAllRanges();
        currentRange && selection.addRange(currentRange);
    }

    return !hasError;
};
