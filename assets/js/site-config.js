// This File is setting up the filepath solution.
// Since there are other Scripts that are called in differenent places, the links will or won't work depending on where they are.
// This Script solves this problem by always looking from Site_Base 'Root'


// Capture the location of this script before DOMContentLoaded.
const CONFIG_SCRIPT_URL = document.currentScript.src;

// Establish the website root.
const SITE_BASE = new URL("../../", CONFIG_SCRIPT_URL);

// Resolve internal website paths from the root.
function resolveSitePath(path) {
    if (!path) return "";

    // Preserve external and special URLs.
    if (
        /^(https?:)?\/\//i.test(path) ||
        /^(data:|blob:|mailto:|tel:|#)/i.test(path)
    ) {
        return path;
    }

    return new URL(
        path.replace(/^\/+/, ""),
        SITE_BASE
    ).href;
}

// Make the configuration available to all scripts.
window.SITE_BASE = SITE_BASE;
window.resolveSitePath = resolveSitePath;