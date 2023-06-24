// converter
var converter = $('#convert');
converter.on('animationend', (e) => {
    // converter.removeClassRegex('animate__*');
    converter.removeClass();
});

converter.on('click', (e) => {
    converter.addClass('spin');
});

var panels = $('div.panel');
panels.on('animationend', (e) => {
    panels.each(function() {
        $(this).removeClassRegex('animate__*');
    });
});
