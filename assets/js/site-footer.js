document.addEventListener("DOMContentLoaded", async function () {

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

    } catch (error) {
        console.error("Footer loading failed:", error);
    }
});