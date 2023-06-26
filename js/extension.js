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
            res += (cnt === 0) ? '&nbsp;' :  ' ';
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
