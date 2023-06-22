// converter
var converter = $('#convert');
converter.on('animationend', (e) => {
    converter.removeClass();
});

converter.on('click', (e) => {
    converter.addClass('spin');
});

