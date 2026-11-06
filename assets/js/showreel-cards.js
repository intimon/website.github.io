/*
     Showreel Cards
     
     Big Showreel Video Cards at top of the Section. These are very much like the Project Cards:
     Create a box copy and fill out on of the Templates in the 'Const showreel =' Section. Once this is done it can be easily called in the HTML file where needed.
     
     Required HTML:
     - .collapsible-section
     - .collapsible-toggle
     - .collapsible-content
 */

(function () {
    
    // Any new Showreel get created here. Copy and fill out content for a new Variable of Showreel. Description in first box:
    // There are two kind of Showreels. Project specific Videos, and overall Portfolio Showreels
    const showreels = {
        
        //---------------------------------------
        //Portfolio Showreels
        //---------------------------------------
        "graphic-design-showreel": {
            title: "Showreel",      // Headline Title of the Showreel
            videoId: "Ko4jae5adSQ",     // This is the unique Identifier ID Number of a Youtube Video. Youtube Videos are the prefered and set up carrier for Portfolio Showreels.
            accentColor: "rgb(155, 195, 55)",   //This is the Accent Color and get's used for Hover, etc.
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
        
        "Free": {
            title: "Free",
            videoId: "tUCvpLvUoGc",
            accentColor: "var(--color-blue)"
        },
    };


    // Function to create a Showreel
    function createShowreelCard(showreel) {
        
        //Create Showreel Article and class
        const card = document.createElement("article");
        card.className = "showreel-card";
        
        //Color
        card.style.setProperty(
            "--showreel-accent-color",
            showreel.accentColor || "#292d33"
        );
        
        // Title
        const title = document.createElement("h2");
        title.className = "showreel-title";
        title.textContent = showreel.title;
        
        // Video
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
        
        // End of Function
        return card;
    }

    //Search and fill in Showreels when called in HTML File
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll("[data-showreel-card]").forEach(container => {
            const showreel = showreels[container.dataset.showreelCard];

            if (showreel) {
                container.replaceChildren(createShowreelCard(showreel));
            }
        });
    });

})();