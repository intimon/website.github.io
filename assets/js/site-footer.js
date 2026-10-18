
document.addEventListener("DOMContentLoaded", async function () {
    const container = document.querySelector("#site-footer");

    if (!container) return;

    try {
        const response = await fetch("components/footer.html");

        if (!response.ok) {
            throw new Error("Could not load components/footer.html");
        }

        container.innerHTML = await response.text();

    } catch (error) {
        console.error("Footer loading failed:", error);
    }
});
