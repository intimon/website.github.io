// -----------------------------------------------
// Website Script Loader
/*
This is set up to bring all the scripts into one
place. Updates, additions and removals can be
managed here and applied across all pages.
*/
// -----------------------------------------------

(function () {

    // Capture the loader's location.
    const loaderURL = document.currentScript.src;

    // Establish the website root.
    const SITE_BASE = new URL("../../", loaderURL);

    // Set up the preloader on the first entry in this tab.
    function setupPreloader() {

        const preloader = document.getElementById("site-preloader");
        const video = document.getElementById("preloader-video");

        if (!preloader || !video) return;

        // Only continue on the first entry in this tab.
        if (!document.documentElement.classList.contains("preloader-active")) {
            return;
        }

        // Resolve the video path from the website root.
        video.src = new URL(
            "images/Logo_THC/Logo_Roll_Animation.mp4",
            SITE_BASE
        ).href;

        // Wait for the page to finish loading.
        const pageLoaded = new Promise(resolve => {

            if (document.readyState === "complete") {
                resolve();
            } else {
                window.addEventListener("load", resolve, { once: true });
            }

        });

        // Attempt video playback.
        video.play().catch(error => {
            console.warn("Preloader video playback failed:", error);
        }).finally(() => {

            const startTime = Date.now();

            pageLoaded.then(() => {

                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 5500 - elapsed);

                setTimeout(() => {

                    preloader.classList.add("hidden");

                    setTimeout(() => {
                        preloader.remove();
                    }, 600);

                }, remaining);

            });

        });
    }

    // Scripts to load in order.
    const scripts = [
        "assets/js/jquery.min.js",
        "assets/js/jquery.dropotron.min.js",
        "assets/js/browser.min.js",
        "assets/js/breakpoints.min.js",
        "assets/js/util.js",
        "assets/js/main.js",
        "assets/js/site-config.js",
        "assets/js/banner-dots.js",
        "assets/js/site-header.js",
        "assets/js/site-footer.js",
        "assets/js/project-cards.js",
        "assets/js/showreel-cards.js",
        "assets/js/collapsible-section.js"
    ];

    // Load scripts sequentially.
    async function loadScripts() {

        setupPreloader();
        
        for (const path of scripts) {

            const script = document.createElement("script");

            script.src = new URL(path, SITE_BASE).href;

            await new Promise((resolve, reject) => {

                script.onload = resolve;

                script.onerror = () => reject(
                    new Error(`Failed to load: ${path}`)
                );

                document.body.appendChild(script);

            });

        }

    }

    loadScripts().catch(error => {
        console.error("Website script loader failed:", error);
    });

})();