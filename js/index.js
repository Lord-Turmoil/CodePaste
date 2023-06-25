// converter
var converter = $('#convert');
converter.on('animationend', (e) => {
    converter.removeClassRegex('animate__*');
});

converter.on('click', (e) => {
    converter.addClass('animate__spin');
    makePaste();
});

var input = $('#source');
var output = $('pre>code');
function makePaste() {
    // console.log(input.val());
    var code = input.val();
    if (code === '') {
        code = ' ';
    }
    output.html(code);
    Prism.highlightAll();
}

// panel
var panels = $('div.panel');
panels.on('animationend', (e) => {
    panels.each(function () {
        $(this).removeClassRegex('animate__*');
    });
});

// line-no
var pre = $('#pre');
$("#cb3-8").change(function () {
    if (this.checked) {
        pre.addClass('line-numbers');
    }
    else {
        pre.removeClass('line-numbers');
    }
    Prism.highlightAll();
});


// auto-fit text area
// Reference: https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize

const MIN_HEIGHT = 300;
const MAX_HEIGHT = 500;
$("textarea").each(function () {
    this.setAttribute("style", "height:" + (MIN_HEIGHT) + "px;");
}).on("input", function () {
    this.style.height = 0;
    var targetHeight = this.scrollHeight;
    if (targetHeight > MAX_HEIGHT) {
        $(this).addClass('full');
        targetHeight = MAX_HEIGHT;
    }
    else {
        $(this).removeClass('full');
        if (targetHeight < MIN_HEIGHT) {
            targetHeight = MIN_HEIGHT;
        }
    }
    this.style.height = (targetHeight) + "px";
});
