// This is a universial site footer
// It can be used on every site, without having issues with links and saves a lot of copy, pasting and rework of the footer section.
// For the .html section look in components/footer.html
// The dynamic link solution is in assets/js/site-config.js

document.addEventListener("DOMContentLoaded", async function () {
    
    //Dynamic Path solution
    const resolveSitePath = window.resolveSitePath;
    const container = document.querySelector("#site-footer");

    //Footer Logic
    if (!container) return;

    //if container is in the site, load the footer in.
    try {
        const footerURL = resolveSitePath("components/footer.html");
        const response = await fetch(footerURL);

        if (!response.ok) {
            throw new Error("Could not load components/footer.html");
        }

        container.innerHTML = await response.text();
        
    // Debugging: Error message if issues.
    } catch (error) {
        console.error("Footer loading failed:", error);
    }
});