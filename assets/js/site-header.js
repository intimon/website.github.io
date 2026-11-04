document.addEventListener("DOMContentLoaded", async function () {

    // -----------------------------------------------
    // Site configuration
    // -----------------------------------------------

    const SITE_BASE = new URL("/website.github.io/", window.location.origin);

    // Resolve local paths relative to the site root.
    function resolveSitePath(path) {

        if (!path) return "";

        // Leave external URLs and special URLs unchanged.
        if (
            /^(https?:)?\/\//i.test(path) ||
            /^(data:|blob:|mailto:|tel:|#)/i.test(path)
        ) {
            return path;
        }

        // Avoid duplicating the site base path.
        if (path.startsWith(SITE_BASE.pathname)) {
            return new URL(path, window.location.origin).href;
        }

        // Remove leading slashes and relative navigation segments.
        const cleanPath = path
            .replace(/^(\.\.\/)+/, "")
            .replace(/^(\.\/)+/, "")
            .replace(/^\/+/, "");

        return new URL(cleanPath, SITE_BASE).href;
    }

    // -----------------------------------------------
    // Header container and settings
    // -----------------------------------------------

    const container = document.querySelector("#site-header");

    if (!container) return;

    const banner = resolveSitePath(container.dataset.banner || "");

    const bannerType = (
        container.dataset.bannerType || "image"
    ).trim().toLowerCase();

    const poster = resolveSitePath(container.dataset.poster || "");

    const title = container.dataset.title || "";
    const description = container.dataset.description || "";

    try {

        // -----------------------------------------------
        // Load shared header HTML
        // -----------------------------------------------

        const headerURL = resolveSitePath("components/header.html");

        const response = await fetch(headerURL);

        if (!response.ok) {
            throw new Error("Could not load components/header.html");
        }

        container.innerHTML = await response.text();

        // -----------------------------------------------
        // Build mobile navigation
        // -----------------------------------------------

        function createMobileNavigation() {

            const desktopNav = container.querySelector("#nav");

            if (!desktopNav) return;

            // Remove existing mobile navigation if present.
            document.querySelector("#navPanel")?.remove();
            document.querySelector("#titleBar")?.remove();

            // Create mobile navigation panel.
            const panel = document.createElement("nav");

            panel.id = "navPanel";
            panel.setAttribute("aria-label", "Mobile navigation");

            // Recursively copy navigation links.
            function addLinks(list, depth = 0) {

                Array.from(list.children).forEach(item => {

                    if (item.tagName !== "LI") return;

                    // Skip the desktop logo.
                    if (item.classList.contains("nav-logo")) return;

                    const link = Array.from(item.children)
                        .find(child => child.tagName === "A");

                    if (link) {

                        const mobileLink = document.createElement("a");

                        mobileLink.className = "link";

                        if (depth === 0) {
                            mobileLink.classList.add("depth-0");
                        }

                        if (link.hasAttribute("href")) {
                            mobileLink.href = link.getAttribute("href");
                        }

                        // Add indentation for nested links.
                        if (depth > 0) {

                            const indent = document.createElement("span");

                            indent.className = `indent-${Math.min(depth, 5)}`;

                            mobileLink.appendChild(indent);
                        }

                        mobileLink.appendChild(
                            document.createTextNode(link.textContent.trim())
                        );

                        panel.appendChild(mobileLink);
                    }

                    // Find nested submenu.
                    const submenu = Array.from(item.children)
                        .find(child => child.tagName === "UL");

                    if (submenu) {
                        addLinks(submenu, depth + 1);
                    }

                });
            }

            const mainList = desktopNav.querySelector(":scope > ul");

            if (mainList) {
                addLinks(mainList);
            }

            // Create mobile title bar and toggle.
            const titleBar = document.createElement("div");

            titleBar.id = "titleBar";

            const toggle = document.createElement("button");

            toggle.type = "button";
            toggle.className = "toggle";
            toggle.setAttribute("aria-label", "Open navigation");
            toggle.setAttribute("aria-expanded", "false");

            titleBar.appendChild(toggle);

            // Add elements directly to body.
            document.body.appendChild(titleBar);
            document.body.appendChild(panel);

            // -----------------------------------------------
            // Open and close navigation
            // -----------------------------------------------

            toggle.addEventListener("click", function (event) {

                event.preventDefault();

                const currentlyOpen = document.body.classList.contains(
                    "navPanel-visible"
                );

                document.body.classList.toggle(
                    "navPanel-visible",
                    !currentlyOpen
                );

                const isOpen = document.body.classList.contains(
                    "navPanel-visible"
                );

                toggle.setAttribute("aria-expanded", String(isOpen));

                toggle.setAttribute(
                    "aria-label",
                    isOpen ? "Close navigation" : "Open navigation"
                );

            });

            // Close panel after selecting a link.
            panel.addEventListener("click", event => {

                if (event.target.closest("a")) {

                    document.body.classList.remove("navPanel-visible");

                    toggle.setAttribute("aria-expanded", "false");
                    toggle.setAttribute("aria-label", "Open navigation");

                }

            });

            // Close panel with Escape.
            document.addEventListener("keydown", event => {

                if (event.key === "Escape") {

                    document.body.classList.remove("navPanel-visible");

                    toggle.setAttribute("aria-expanded", "false");
                    toggle.setAttribute("aria-label", "Open navigation");

                }

            });

            console.log("Mobile navigation created successfully.");

        }

        createMobileNavigation();

        // -----------------------------------------------
        // Header elements
        // -----------------------------------------------

        const header = container.querySelector("#header");
        const bannerElement = container.querySelector("#header-banner");
        const logo = container.querySelector("#logo");

        const heading = logo?.querySelector("h1");
        const paragraph = logo?.querySelector("p");

        // -----------------------------------------------
        // Set banner media
        // -----------------------------------------------

        if (bannerElement && banner) {

            if (bannerType === "video") {

                if (poster) {
                    bannerElement.style.backgroundImage =
                        `url("${poster}")`;
                }

                const video = document.createElement("video");

                video.className = "header-video";
                video.src = banner;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = "auto";

                if (poster) {
                    video.poster = poster;
                }

                video.addEventListener("error", () => {

                    console.error(
                        "Banner video failed to load:",
                        banner,
                        video.error
                    );

                });

                bannerElement.appendChild(video);

                video.play().catch(error => {

                    console.warn(
                        "Banner video could not play:",
                        error
                    );

                });

            } else {

                bannerElement.style.backgroundImage =
                    `url("${banner}")`;

            }

            console.log("Banner path:", banner);

            if (poster) {
                console.log("Poster path:", poster);
            }

        }

        // -----------------------------------------------
        // Set optional text
        // -----------------------------------------------

        if (heading) {
            heading.textContent = title;
        }

        if (paragraph) {
            paragraph.textContent = description;
        }

        if (logo) {
            logo.hidden = !title && !description;
        }

        // -----------------------------------------------
        // Notify other scripts
        // -----------------------------------------------

        document.dispatchEvent(new Event("siteHeaderLoaded"));

    } catch (error) {

        console.error("Header loading failed:", error);

    }

});