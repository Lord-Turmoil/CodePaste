alertify.set('notifier', 'delay', 1.5);
alertify.set('notifier', 'position', 'bottom-left');

// help
var help = $('#help');
var isHelpOn = false;   // used in help
help.click(function () {
    help.toggleClass('active');
    isHelpOn = !isHelpOn;
    toggleHelp();
});

// dark/light mode
var mode = $('#mode');
var isDark = false;
mode.click(function () {
    mode.toggleClass('active');
    isDark = !isDark;
    toggleMode();
});

function toggleMode() {
    if (isDark) {
        $('#mode-css').attr('href', "css/dark.css");
        localStorage.setItem("mode", "dark");
    } else {
        $('#mode-css').attr('href', "");
        localStorage.setItem("mode", "light");
    }
}

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
    eraser.addClass('animate__animated animate__shake');
    clearPaste();
});

var copier = $('#copy');
copier.on('click', (e) => {
    copier.addClass('animate__animated animate__grow');
    copyPaste();
});

// Prism core converter.
var input = $('#source');
var output = $('pre>code');
var isEmpty = true;    // used in help

// Override tab key behavior
input.on('keydown', function (e) {
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


async function makePaste(type) {
    output.html('');
    output.text(input.val().trim());
    await Prism.highlightAll();
    if (output.html() === '') {
        isEmpty = true;
        if (type === 'clear') {
            alertify.success("Code paste already cleared 🥹");
        } else if (type == 'make') {
            alertify.warning("The ingredient, please (> <)");
        }
    } else {
        isEmpty = false;
        var str = output.html().toString();
        str = str.replaceAll('\n', '<br/>');
        str = normalizeString(str);
        output.html(str);
        if (type == 'make') {
            alertify.success("Code paste ready to go!😋");
        } else if (type == 'random') {
            alertify.success("You like the random paste?🙃");
        }
    }
    if (isHelpOn) {
        help.click();
    }

    toggleHelp();
    updateLanguageTip();
}

async function clearPaste() {
    input.val('');
    $('#source').get(0).dispatchEvent(new Event('input'));
    await makePaste('clear');
}

async function overloadStyle() {
    $('.code').addClass('pre-copy');
    $('.code').addClass('copy');
    await new Promise(r => setTimeout(r, 100));
}

function restoreStyle() {
    $('.code').removeClass('copy');
    $('.code').removeClass('pre-copy');
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

// language
var currentLanguage = "C";
function updateLanguageTip() {
    var tip = $('div.toolbar-item span');
    if (tip.length) {
        tip.text(currentLanguage);
    }
}

var code = $('#code');
$('#lang').change(function () {
    var optionSelected = $(this).find("option:selected");
    updateActiveLanguage(optionSelected.val(), optionSelected.text());
    localStorage.setItem("language", optionSelected.val());
});

function updateActiveLanguage(lang, text) {
    code.removeClass().addClass('language-' + lang);
    currentLanguage = text;
}

// Line number.
var pre = $('#pre');
$("#cb3-8").change(function () {
    if (this.checked) {
        pre.addClass('line-numbers');
    } else {
        pre.removeClass('line-numbers');
    }
    localStorage.setItem("lineno", this.checked);
    makePaste('lineno');
});
const hasLineNo = () => $("#cb3-8").get(0).checked;

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
    alertify.alert("Buy me a coffee 🍵", `<div class="coffee"><img src="res/img/payment.jpg" alt="WeChat Pay" title="Scan to support me"><p>We appreciate your sponsorship!🌹</p></div>`);
});

// Random code.
var random = $('#random');
random.on('click', (e) => {
    random.addClass('animate__animated animate__rubber');
    makeRandomPaste();
});

// Random codes are in code.js

function generateRandomLanguage() {
    const target = Math.floor(Math.random() * CODE_COUNT);
    var i = 0;
    for (const [key, value] of Object.entries(CODE_SET)) {
        if (i == target) {
            return key;
        }
        i++;
    }
}

function getRandomLanguage() {
    const optionSelected = $('#lang').find("option:selected");
    const current = optionSelected.val();
    var lang = generateRandomLanguage();
    while (lang == current) {
        lang = generateRandomLanguage();
    }
    return lang;
}

function makeRandomPaste() {
    // get random code
    const lang = getRandomLanguage();
    input.val(CODE_SET[lang]);
    $('#source').get(0).dispatchEvent(new Event('input'));

    // update language
    $('option[value="' + lang + '"]').prop("selected", true);
    const optionSelected = $('#lang').find("option:selected");
    updateActiveLanguage(optionSelected.val(), optionSelected.text());

    // auto trigger make
    makePaste('random');
}

function makeRandomPasteWithLang(lang) {
    // get random code
    input.val(CODE_SET[lang]);
    $('#source').get(0).dispatchEvent(new Event('input'));

    // update language
    $('option[value="' + lang + '"]').prop("selected", true);
    const optionSelected = $('#lang').find("option:selected");
    updateActiveLanguage(optionSelected.val(), optionSelected.text());

    // auto trigger make
    makePaste('random');
}

async function copyPaste() {
    if (output.html() === '') {
        alertify.warning("Make your code paste first (> <)");
        return;
    }

    await overloadStyle();
    if (copyPasteImpl(output.get(0))) {
        alertify.success("Code paste copied to clipboard!🤩");
    } else {
        alertify.error("Oops! Something went wrong :(");
    }
    restoreStyle();
}

function copyPasteImpl(element) {
    const backupElem = element.innerHTML;

    var target = element;
    var ret = true;

    if (hasLineNo()) {
        target = transformPaste(element);
    }
    if (!copyHTMLElement(target)) {
        ret = false;
    }
    element.innerHTML = backupElem;

    return ret;
}

// Transform paste into table.
function transformPaste(element) {
    var content = element.innerHTML;
    // Remove last <span> element.
    var pos = content.lastIndexOf('<span aria-hidden="true" class="line-numbers-rows">');
    content = content.substring(0, pos);

    // Split content by <br>
    var lines = content.split('<br>');
    var table = '<table>';
    for (var i = 0; i < lines.length; i++) {
        table += '<tr><td class="lineno" width="3em">' + (i + 1) + '</td><td class="line">' + lines[i] + '</td></tr>';
    }
    table += '</table>';

    // Get dynamic styles.
    var borderStyle = window.getComputedStyle($('.line-numbers .line-numbers-rows').get(0), null).getPropertyValue('border-right');
    var height = window.getComputedStyle($('code[class*=language-] .line-numbers-rows span').get(0), null).getPropertyValue('height');
    var fontStyle = window.getComputedStyle($('code[class*=language-], pre[class*=language-]').get(0), null).getPropertyValue('font-family');
    var tableElement = element.cloneNode(false);
    tableElement.innerHTML = table;
    element.innerHTML = table;

    borderStyle = borderStyle.substring(borderStyle.indexOf('rgba'));
    $('pre code table tr td').css('font-family', fontStyle);
    $('pre code table tr').css('height', height);

    return element;
}

if (localStorage.getItem("lineno") != null) {
    const value = localStorage.getItem("lineno")
    if (value === 'true') {
        $("#cb3-8").get(0).checked = value;
        pre.addClass('line-numbers');
    }
}

if (localStorage.getItem("language") != null) {
    $('option[value="' + localStorage.getItem("language") + '"]').prop("selected", true);
    const optionSelected = $('#lang').find("option:selected");
    updateActiveLanguage(optionSelected.val(), optionSelected.text());
    setTimeout(function () {
        makeRandomPasteWithLang(localStorage.getItem("language"));
    }, 1000);
}
else {
    setTimeout(function () {
        makeRandomPaste()
    }, 1000);
}

if (localStorage.getItem("notify") == null) {
    alertify.alert("Notification 🔔", `<div class="notification"><p>We use <a href="https://clarity.microsoft.com/" target="_blank">Microsoft Clarity</a> to provide you with better user experience.</p><br/><p>By continuing, it means you accept this tracker.🖲️</p></div>`);
    localStorage.setItem("notify", true);
}

if (localStorage.getItem("mode") != null) {
    isDark = localStorage.getItem("mode") === "dark";
    if (isDark) {
        if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toggleMode();
        }
        mode.toggleClass('active');
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toggleMode();
        }
    }
}