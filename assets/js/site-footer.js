// This is a universial site footer
// It can be used on every site, without having issues with links and saves a lot of copy, pasting and rework of the footer section.
// For the .html section look in components/footer.html
// The dynamic link solution is in assets/js/site-config.js

async function loadSiteFooter() {

    const resolveSitePath = window.resolveSitePath;
    const container = document.querySelector("#site-footer");

    if (!container) return;

    try {

        const footerURL = resolveSitePath("components/footer.html");
        const response = await fetch(footerURL);

        if (!response.ok) {
            throw new Error("Could not load components/footer.html");
        }

        container.innerHTML = await response.text();

        // Resolve all local image paths from the website root.
        container.querySelectorAll("img").forEach(image => {
            image.src = resolveSitePath(image.getAttribute("src"));
        });

        // Resolve internal footer links.
        container.querySelectorAll("a").forEach(link => {
            link.href = resolveSitePath(link.getAttribute("href"));
        });

    } catch (error) {

        console.error("Footer loading failed:", error);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadSiteFooter);
} else {
    loadSiteFooter();
}
