// normalize plugin
Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
    // 'break-lines': 80,
    // 'indent': 4,
    // 'remove-initial-line-feed': true,
    'tabs-to-spaces': 4
    // 'spaces-to-tabs': 4
});

alertify.set('notifier', 'delay', 1.5);

// help
var help = $('div.help-inner');
var isHelpOn = false;   // used in help
help.click(function () {
    help.toggleClass('active');
    isHelpOn = !isHelpOn;
    toggleHelp();
});

// actions
$('div.action').each(function () {
    $(this).on('animationend', (e) => {
        $(this).removeClassRegex('animate__*');
    });
});

var converter = $('#convert');
converter.on('click', (e) => {
    converter.addClass('animate__animated animate__spin');
    makePaste('make');
});

var eraser = $('#erase');
eraser.on('click', (e) => {
    eraser.addClass('animate__animated animate__grow');
    clearPaste();
});

var copier = $('#copy');
copier.on('click', (e) => {
    copier.addClass('animate__animated animate__grow');
    copyPaste();
});

var input = $('#source');
var output = $('pre>code');
var isEmpty = true;    // used in help

async function makePaste(type) {
    // console.log(input.val());
    output.html('');
    output.text(input.val().trim());
    await Prism.highlightAll();
    if (output.html() === '') {
        isEmpty = true;
        if (type === 'clear') {
            alertify.success("Code paste cleared 🥹");
        } else {
            alertify.warning("The ingredient, please (> <)");
        }
    } else {
        isEmpty = false;
        var str = output.html().toString();
        str = str.replaceAll('\n', '<br/>');
        str = normalizeString(str);
        output.html(str);
        alertify.success("Code paste ready to go! 😋");
    }
    if (isHelpOn) {
        help.click();
    }

    toggleHelp();
}

async function clearPaste() {
    input.val('');
    $('#source').get(0).dispatchEvent(new Event('input'));
    await makePaste('clear');
}

async function copyPaste() {
    if (output.html() === '') {
        alertify.warning("Make your code paste first (> <)");
        return;
    }

    if (copyHTMLElement(output.get(0))) {
        alertify.success("Code paste copied to clipboard!");
    } else {
        alertify.error("Oops! Something went wrong :(");
    }
}

var cover = $('div.cover');
var showHelp = true;
var interval = null;
function toggleHelp() {
    var show = (isEmpty || isHelpOn);
    if (show === showHelp) {
        return;
    }
    showHelp = show;
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }
    cover.removeClassRegex('animate__*');
    if (showHelp) {
        cover.addClass('animate__animated animate__fadeIn');
        cover.show();
    } else {
        cover.addClass('animate__animated animate__fadeOut');
        interval = setTimeout(function () {
            cover.hide();
        }, 500);
    }
}

// panel
$('div.panel').each(function () {
    $(this).on('animationend', (e) => {
        $(this).removeClassRegex('animate__*');
    });
});

// line-no
var pre = $('#pre');
$("#cb3-8").change(function () {
    if (this.checked) {
        pre.addClass('line-numbers');
    } else {
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
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 600;
$("textarea").each(function () {
    this.setAttribute("style", "height:" + (MIN_HEIGHT) + "px;");
}).on("input", function () {
    this.style.height = 0;
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

// support
var supporter = $('#coffee');
supporter.on('click', (e) => {
    supporter.addClass('animate__animated animate__grow');
    alertify.alert("Buy me a coffee 🍵", `<div class="coffee"><img src="/res/img/payment.jpg" alt="WeChat Pay" title="Scan to support me"><p>We appreciate your sponsorship!🌹</p></div>`);
});