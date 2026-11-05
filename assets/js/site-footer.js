const FOOTER_SCRIPT_URL = document.currentScript.src;

document.addEventListener("DOMContentLoaded", async function () {
    const SITE_BASE = new URL("../../", FOOTER_SCRIPT_URL);
    const container = document.querySelector("#site-footer");

    if (!container) return;

    try {
        const footerURL = new URL("components/footer.html", SITE_BASE);
        const response = await fetch(footerURL);

        if (!response.ok) {
            throw new Error("Could not load components/footer.html");
        }

        container.innerHTML = await response.text();

    } catch (error) {
        console.error("Footer loading failed:", error);
    }
});