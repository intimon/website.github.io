// -----------------------------------------------
/*
Website Script Loader

This is set up to bring all the Scripts in one place and when ever there is a update, 
something added or removed, it's done on all the pages automatically. This removes the 
time to update things and there are less likely mistakes because one page was forgotten to be updated.
*/


// Get the location of this script.
const loaderURL = document.currentScript.src;

// Establish the website root.
const SITE_BASE = new URL("../../", loaderURL);

// Scripts loaded in order.
const scripts = [
    "assets/js/jquery.min.js",
    "assets/js/jquery.dropotron.min.js",
    "assets/js/browser.min.js",
    "assets/js/breakpoints.min.js",
    "assets/js/util.js",
    "assets/js/main.js",
    "assets/js/project-cards.js",
    "assets/js/showreel-cards.js",
    "assets/js/site-config.js",
    "assets/js/site-header.js",
    "assets/js/site-footer.js"
];

// Load the scripts in their original order.
scripts.forEach(path => {
    const script = document.createElement("script");
    script.src = new URL(path, SITE_BASE).href;
    script.async = false;
    document.write(
        `<script src="${script.src}"><\/script>`
    );
});

// Load collapsible sections with defer.
const collapsibleScript = new URL(
    "assets/js/collapsible-section.js",
    SITE_BASE
).href;

document.write(
    `<script defer src="${collapsibleScript}"><\/script>`
);
