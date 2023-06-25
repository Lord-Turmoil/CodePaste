// normalize plugin
Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
    // 'break-lines': 80,
    // 'indent': 4,
    // 'remove-initial-line-feed': true,
    // 'tabs-to-spaces': 4
    // 'spaces-to-tabs': 4
});


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
var cover = $('div.cover');
async function makePaste() {
    // console.log(input.val());
    output.html('');
    output.text(input.val().trim());
    await Prism.highlightAll();
    if (output.html() === '') {
        cover.show();
    } else {
        cover.hide();
    }
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

// language
var code = $('#code');
$('#lang').change(function () {
    var optionSelected = $(this).find("option:selected");
    var cls = 'language-' + optionSelected.val();
    code.removeClass().addClass(cls);
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
