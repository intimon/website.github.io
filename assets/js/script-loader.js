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
    async function setupPreloader() {

        if (sessionStorage.getItem("preloaderShown")) return;

        sessionStorage.setItem("preloaderShown", "true");

        // Load the preloader stylesheet.
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = new URL("assets/css/preloader.css", SITE_BASE).href;

        document.head.appendChild(css);

        await new Promise(resolve => {
            css.onload = resolve;
            css.onerror = resolve;
        });

        // Load the preloader HTML.
        const response = await fetch(
            new URL("components/preloader.html", SITE_BASE)
        );

        if (!response.ok) {
            throw new Error("Could not load preloader.html");
        }

        const wrapper = document.createElement("div");
        wrapper.innerHTML = await response.text();

        const preloader = wrapper.firstElementChild;
        const video = preloader.querySelector("video");

        // Resolve the video path from the website root.
        video.querySelector("source").src =
            new URL("images/Logo_THC/Logo_Roll_Animation.mp4", SITE_BASE).href;

        video.load();

        document.body.prepend(preloader);

        // Remove the preloader when the page has finished loading.
        const hidePreloader = () => {
            preloader.classList.add("hidden");

            setTimeout(() => preloader.remove(), 600);
        };

        if (document.readyState === "complete") {
            hidePreloader();
        } else {
            window.addEventListener("load", hidePreloader, { once: true });
        }
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
        "assets/js/project-cards.js",
        "assets/js/showreel-cards.js",
        "assets/js/site-header.js",
        "assets/js/site-footer.js",
        "assets/js/collapsible-section.js"
    ];

    // Load scripts sequentially.
    async function loadScripts() {

        await setupPreloader();
        
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