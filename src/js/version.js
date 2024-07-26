fetch("./version.json")
    .then((res) => {
        if (!res.ok) {
            throw new Error("Cannot find \"data.json\".");
        }
        return res.json();
    })
    .then((data) => render(data))
    .catch((error) => {
        console.error(error);
    });

function render(versions) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var latest = "";
    var previous = "";
    versions = versions.reverse();
    versions.forEach((version, index) => {
        html = "";
        html += '<div class="doc-badge-base">';
        html += '<h2>Version ' + version.version + '</h2>';
        html += '<div class="doc-badge bubble glow-on-hover">';
        html += '<p>' + new Date(version.date).toLocaleDateString("en-US", options) + '</p>';
        html += '</div>';
        html += '</div>'
        html += '<div class="doc-entry">';
        version.entries.forEach((entry) => {
            html += '<h3>' + entry.title + '</h3>';
            html += '<div class="doc-text">';
            entry.items.forEach((item) => {
                html += '<p>' + item + '</p>';
            });
            html += '</div>';
        });
        html += '</div>';
        if (index == 0) {
            latest = html;
        } else {
            previous += html;
        }
    });
    $(`#latest`).html(latest);
    $(`#previous`).html(previous);
}

const expandMore = $("#expand-more");
const expandLess = $("#expand-less");
const previous = $("#previous");

function expand() {
    previous.removeClass("hidden");
    previous.height(previous[0].scrollHeight);
    expandMore.addClass("hidden");
    expandLess.removeClass("hidden");
}
function collapse() {
    previous.addClass("hidden");
    previous.height(0);
    expandMore.removeClass("hidden");
    expandLess.addClass("hidden");
}
expandMore.click(expand);
expandLess.click(collapse);