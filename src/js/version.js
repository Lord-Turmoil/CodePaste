import alertify from "~/vendor/alertify-extension";
import $ from "~/vendor/jquery-extensions";

function render(versions) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    var latest = "";
    var previous = "";
    versions = versions.reverse();
    versions.forEach((version, index) => {
        var html = "";
        html += '<div class="doc-badge-base">';
        html += "<h2>Version " + version.version + "</h2>";
        html += '<div class="doc-badge bubble glow-on-hover">';
        html += "<p>" + new Date(version.date).toLocaleDateString("en-US", options) + "</p>";
        html += "</div>";
        html += "</div>";
        html += '<div class="doc-entry">';
        version.entries.forEach((entry) => {
            html += "<h3>" + entry.title + "</h3>";
            html += '<div class="doc-text">';
            entry.items.forEach((item) => {
                html += "<p>" + item + "</p>";
            });
            html += "</div>";
        });
        html += "</div>";
        if (index == 0) {
            latest = html;
        } else {
            previous += html;
        }
    });
    $("#latest").html(latest);
    $("#previous").html(previous);
}

const expandMore = $("#expand-more");
const expandLess = $("#expand-less");
const previous = $("#previous");

function expand() {
    previous.removeClass("hidden");
    previous.height(previous[0].scrollHeight);
    expandMore.addClass("hidden");
    expandLess.removeClass("hidden");
    setTimeout(() => {
        $("#more-anchor").get(0).scrollIntoView({ behavior: "smooth" });
    }, 150);
}

function collapse() {
    previous.addClass("hidden");
    previous.height(0);
    expandMore.removeClass("hidden");
    expandLess.addClass("hidden");
    setTimeout(() => {
        $("#less-anchor").get(0).scrollIntoView({ behavior: "smooth" });
    }, 150);
}

function loadVersion() {
    fetch("./version.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Cannot find \"data.json\".");
            }
            return res.json();
        })
        .then((data) => render(data))
        .catch((error) => {
            console.log(error);
            alertify.error("Failed to load version data 😰");
        });

    expandMore.on("click", expand);
    expandLess.on("click", collapse);
}

export { loadVersion };
