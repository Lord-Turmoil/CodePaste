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
