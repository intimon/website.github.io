
document.addEventListener("DOMContentLoaded", async function () {
    const container = document.querySelector("#site-header");
    if (!container) return;

    const banner = container.dataset.banner || "";
    const bannerType = container.dataset.bannerType || "image";
    const poster = container.dataset.poster || "";
    const title = container.dataset.title || "";
    const description = container.dataset.description || "";

    try {
        const response = await fetch("components/header.html");

        if (!response.ok) {
            throw new Error("Could not load components/header.html");
        }

        container.innerHTML = await response.text();

        const header = container.querySelector("#header");
        const logo = container.querySelector("#logo");
        const heading = logo?.querySelector("h1");
        const paragraph = logo?.querySelector("p");

        // Set banner media.
        if (header && banner) {
            if (bannerType === "video") {
                header.style.setProperty(
                    "--header-banner-image",
                    poster ? `url("${poster}")` : "none"
                );

                const video = document.createElement("video");
                video.className = "header-video";
                video.src = banner;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = "metadata";

                if (poster) video.poster = poster;

                header.prepend(video);

                video.play().catch(() => {
                    // Poster remains visible if autoplay is unavailable.
                    console.warn("Banner video could not autoplay.");
                });
            } else if (banner) {
                header.style.setProperty(
                    "--header-banner-image",
                    `url("${banner}")`
                );
            }
        }

        // Set optional text.
        if (heading) heading.textContent = title;

        if (paragraph) {
            paragraph.textContent = description;
        }

        if (logo) {
            logo.hidden = !title && !description;
        }

        // Notify navigation scripts after the header exists.
        document.dispatchEvent(new Event("siteHeaderLoaded"));

    } catch (error) {
        console.error("Header loading failed:", error);
    }
});
