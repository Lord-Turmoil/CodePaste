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
    html = "";
    versions = versions.reverse();
    versions.forEach((version) => {
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
    });
    $("#version").html(html);
}
