import Prism from 'prismjs';
import $ from '~/vendor/jquery-extensions';
import alertify from '~/vendor/alertify-extension';
import { normalizeString, copyHTMLElement } from '~/utils'

Prism.manual = true;

function copyPasteImpl(element, enableLineNumber) {
    const backupElem = element.innerHTML;

    var target = element;
    if (enableLineNumber) {
        target = transformPaste(element);
    }
    if (!copyHTMLElement(target)) {
        element.innerHTML = backupElem;
        return false;
    }
    element.innerHTML = backupElem;

    return true;
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
    var height = window.getComputedStyle($('code[class*=language-] .line-numbers-rows span').get(0), null).getPropertyValue('height');
    var fontStyle = window.getComputedStyle($('code[class*=language-], pre[class*=language-]').get(0), null).getPropertyValue('font-family');
    var tableElement = element.cloneNode(false);
    tableElement.innerHTML = table;
    element.innerHTML = table;

    $('pre code table tr td').css('font-family', fontStyle);
    $('pre code table tr').css('height', height);

    return element;
}

async function overloadStyle() {
    $('.code').addClass('pre-copy');
    $('.code').addClass('copy');
    await new Promise(r => setTimeout(r, 256));
}

function restoreStyle() {
    $('.code').removeClass('copy');
    $('.code').removeClass('pre-copy');
}

class Paste {
    constructor(input, output) {
        this.map = {
            'make': this.make.bind(this),
            'copy': this.copy.bind(this),
            'erase': this.erase.bind(this),
            'random': this.random.bind(this),
            'refresh': this.refresh.bind(this),
        };
        this.inputSelector = input;
        this.outputSelector = output;
        this.withLineNumber = false;
        this.update();
    }

    update() {
        this.input = $(this.inputSelector);
        this.output = $(this.outputSelector);
    }

    hasInput() {
        return this.input.val() !== '';
    }

    /**
     * We have to expose this to let outside world set the random language.
     * @returns the input object
     */
    setInput(text) {
        this.input.val(text);
        this.input.get(0).dispatchEvent(new Event('input'));
    }

    isEmpty() {
        return (this.output.get(0).textContent.trim() === '') && (this.output.get(0).childElementCount === 0);
    }

    hasOutput() {
        return !this.isEmpty();
    }

    enableLineNumber(enabled) {
        this.withLineNumber = enabled;
    }

    /**
     * Dispatch command to the paste engine.
     * @param {string} type action type for the reducer
     *                      make
     *                      copy
     *                      erase
     *                      random
     */
    async dispatch(type) {
        this.map[type]();
    }

    async make() {
        if (this.hasInput()) {
            this.highlight();
            alertify.success('Code paste ready to go 😋');
        } else {
            alertify.warning('The ingredient, please 🤧');
        }
        return Promise.resolve();
    }

    async copy() {
        if (this.isEmpty()) {
            alertify.warning('Make your code paste first 😨');
        } else {
            await overloadStyle();
            if (copyPasteImpl(this.output.get(0), this.withLineNumber)) {
                alertify.success('Code paste copied to clipboard 🤩');
            } else {
                alertify.error('Oops! Something went wrong 🤯');
            }
            restoreStyle();
        }
        return Promise.resolve();
    }

    async erase() {
        this.input.val('');
        this.input.get(0).dispatchEvent(new Event('input'));

        if (this.isEmpty()) {
            alertify.warning('You haven\'t made any paste yet 😅');
        }
        else {
            this.highlight();
            alertify.success('Code paste cleared 🥹');
            if (this.hasOutput()) {
                alertify.error('The paste is too good to be erased 😅');
            }
        }

        return Promise.resolve();
    }

    /**
     * Same as make, but different success message.
     */
    async random() {
        if (this.hasInput()) {
            this.highlight();
            alertify.success('You like the random paste? 🙃');
        } else {
            alertify.error('The ingredient, please 🫨');
        }
        return Promise.resolve();
    }

    /**
     * Just refresh the output with no message.
     */
    async refresh() {
        this.highlight();
        return Promise.resolve();
    }

    highlight() {
        // FIXME: Currently will ignore the whitespace at the beginning.
        this.output.html('');
        this.output.text(this.input.val().trim());
        Prism.highlightAll();
        var corrected = this.output.html().toString().replaceAll('\n', '<br>');
        this.output.html(normalizeString(corrected));
        this.update()
    }
}

// Because Prism will insert parent element for the code block, we have to
// re-select the input and output element.
const paste = new Paste('#source', 'pre>code');

export default paste;
