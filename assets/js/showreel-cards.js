(function () {

    const showreels = {
        "graphic-design-showreel": {
            title: "Showreel",
            videoId: "Ko4jae5adSQ",
            accentColor: "rgb(155, 195, 55)",
        },

        "animation-showreel": {
            title: "Animation Showreel",
            videoId: "5FMmK0JhUFo",
            accentColor: "var(--color-blue)"
        },
        
        "previs-showreel": {
            title: "Previs Showreel",
            videoId: "4V3KFBOcSGY",
            accentColor: "var(--color-blue)"
        },
        
        "film-showreel": {
            title: "Film & VFX Showreel",
            videoId: "Fj1FPyDKMnM",
            accentColor: "var(--color-blue)"
        },
        
        "techart-showreel": {
            title: "Technical Art Showreel",
            videoId: "HVb4LjsR5Kw",
            accentColor: "var(--color-blue)"
        },
        
        
        
        
        //---------------------------------------
        //Project Showreels
        //---------------------------------------

        "Snare": {
            title: "Snare",
            videoId: "McgLZjzyqPA",
            accentColor: "var(--color-blue)"
        },
        
        //Attribute Manager -------------------------
        "Attribute Manager": {
            title: "Attribute Manager",
            videoId: "18OTPJGTL9A",
            accentColor: "var(--color-blue)"
        },
        
        "Wulver": {
            title: "Wulver",
            videoId: "QHq1xXLYDUY",
            accentColor: "var(--color-blue)"
        },
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