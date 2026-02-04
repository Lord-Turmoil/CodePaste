/**
 * Normalize string by replacing spaces with &nbsp; while skipping tags
 * @param str - HTML string to normalize
 * @returns Normalized string
 */
export function normalizeString(str: string): string {
  let result = '';
  const length = str.length;
  let tagDepth = 0;

  for (let i = 0; i < length; i++) {
    const char = str[i];
    if (char === ' ') {
      result += tagDepth === 0 ? '&nbsp;' : ' ';
    } else {
      result += char;
      if (char === '<') {
        tagDepth++;
      } else if (char === '>') {
        tagDepth--;
      }
    }
  }

  return result;
}

/**
 * Copy HTML element content to clipboard while preserving format and style
 * Reference: https://htmldom.dev/copy-highlighted-code-to-the-clipboard/
 * @param elem - HTML element to copy
 * @returns true if copy was successful
 */
export function copyHTMLElement(elem: HTMLElement): boolean {
  const selection = window.getSelection();
  if (!selection) return false;

  // Save the current selection
  const currentRange = selection.rangeCount === 0 ? null : selection.getRangeAt(0);

  // Select the text content of code element
  const range = document.createRange();
  range.selectNodeContents(elem);
  selection.removeAllRanges();
  selection.addRange(range);

  // Copy to the clipboard
  let hasError = false;
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Copy failed:', err);
    hasError = true;
  } finally {
    // Restore the previous selection
    selection.removeAllRanges();
    if (currentRange) {
      selection.addRange(currentRange);
    }
  }

  return !hasError;
}
