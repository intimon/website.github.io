(function () {

    const showreels = {
        "graphic-design-showreel": {
            title: "Showreel",
            videoId: "Ko4jae5adSQ",
            accentColor: "var(--color-blue)",
        },

        "animation-showreel": {
            title: "Animation Showreel",
            videoId: "YOUR_OTHER_VIDEO_ID",
            accentColor: "rgb(155, 195, 55)"
        }
    };

    function createShowreelCard(showreel) {
        const card = document.createElement("article");
        card.className = "showreel-card";

        card.style.setProperty(
            "--showreel-accent-color",
            showreel.accentColor || "#292d33"
        );

        const title = document.createElement("h2");
        title.className = "showreel-title";
        title.textContent = showreel.title;

        const videoWrapper = document.createElement("div");
        videoWrapper.className = "showreel-video-wrapper";

        const video = document.createElement("iframe");
        video.className = "showreel-video";
        video.src =
            `https://www.youtube-nocookie.com/embed/${encodeURIComponent(showreel.videoId)}`;

        video.title = showreel.title;
        video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        video.allowFullscreen = true;
        video.loading = "lazy";
        video.referrerPolicy = "strict-origin-when-cross-origin";

        videoWrapper.append(video);
        card.append(title, videoWrapper);

        return card;
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll("[data-showreel-card]").forEach(container => {
            const showreel = showreels[container.dataset.showreelCard];

            if (showreel) {
                container.replaceChildren(createShowreelCard(showreel));
            }
        });
    });

})();