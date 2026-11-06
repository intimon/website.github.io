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