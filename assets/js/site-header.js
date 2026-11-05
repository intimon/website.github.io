const SITE_SCRIPT_URL = document.currentScript.src;

document.addEventListener("DOMContentLoaded", async function () {

    // -----------------------------------------------
    // Site configuration
    // -----------------------------------------------

    const SITE_BASE = new URL("../../", SITE_SCRIPT_URL);
    //const SITE_BASE = new URL("/website.github.io/", window.location.origin);
    document.querySelectorAll(".site-logo").forEach(logo => {
        logo.src = new URL("images/Logo_THC/Logo_Navigation.svg", SITE_BASE).href;
    });

    function resolveSitePath(path) {
        if (!path) return "";

        if (
            /^(https?:)?\/\//i.test(path) ||
            /^(data:|blob:|mailto:|tel:|#)/i.test(path)
        ) {
            return path;
        }

        if (path.startsWith(SITE_BASE.pathname)) {
            return new URL(path, window.location.origin).href;
        }

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
    const bannerType = (container.dataset.bannerType || "image")
        .trim()
        .toLowerCase();
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

            document.querySelector("#navPanel")?.remove();
            document.querySelector("#titleBar")?.remove();

            const panel = document.createElement("nav");
            panel.id = "navPanel";
            panel.setAttribute("aria-label", "Mobile navigation");

            let submenuCounter = 0;

            // Build only explicitly enabled navigation items.
            function buildNavigationItem(item, depth = 0) {

                if (
                    item.tagName !== "LI" ||
                    item.dataset.mobile !== "show" ||
                    item.classList.contains("nav-logo")
                ) {
                    return null;
                }

                const originalLink = Array.from(item.children)
                    .find(child => child.tagName === "A");

                const originalSubmenu = Array.from(item.children)
                    .find(child => child.tagName === "UL");

                const listItem = document.createElement("li");
                listItem.className = `mobile-nav-item depth-${depth}`;

                // Build eligible children first. A child cannot appear
                // unless this parent is also explicitly marked "show".
                const childItems = [];

                if (originalSubmenu) {
                    Array.from(originalSubmenu.children).forEach(child => {
                        const builtChild = buildNavigationItem(child, depth + 1);

                        if (builtChild) {
                            childItems.push(builtChild);
                        }
                    });
                }

                const hasVisibleChildren = childItems.length > 0;

                const row = document.createElement("div");
                row.className = "mobile-nav-row";

                const label = originalLink
                    ? originalLink.textContent.trim()
                    : item.textContent.trim();

                const href = originalLink?.getAttribute("href") || "";

                // Real links remain clickable. "#" category labels
                // are rendered as labels instead of navigating to the top.
                if (href && href !== "#") {

                    const mobileLink = document.createElement("a");

                    mobileLink.className = "mobile-nav-link";
                    mobileLink.textContent = label;
                    mobileLink.href = resolveSitePath(href);

                    row.appendChild(mobileLink);

                } else {

                    const mobileLabel = document.createElement("span");

                    mobileLabel.className = "mobile-nav-label";
                    mobileLabel.textContent = label;

                    row.appendChild(mobileLabel);
                }


                // Create submenus for every level, but only add
                // an arrow button to top-level navigation items.
                if (hasVisibleChildren) {

                    const submenu = document.createElement("ul");

                    submenu.id = `mobile-submenu-${++submenuCounter}`;
                    submenu.className = "mobile-submenu";
                    submenu.hidden = true;

                    childItems.forEach(child => submenu.appendChild(child));

                    // Only top-level items receive an expand/collapse arrow.
                    if (depth === 0) {

                        const submenuToggle = document.createElement("button");

                        submenuToggle.type = "button";
                        submenuToggle.className = "mobile-submenu-toggle";
                        submenuToggle.innerHTML = '<span class="submenu-arrow"></span>';
                        submenuToggle.setAttribute("aria-expanded", "false");
                        submenuToggle.setAttribute("aria-controls", submenu.id);
                        submenuToggle.setAttribute(
                            "aria-label",
                            `Expand ${label} submenu`
                        );

                        row.appendChild(submenuToggle);
                    }

                    listItem.appendChild(row);
                    listItem.appendChild(submenu);

                } else {

                    listItem.appendChild(row);
                }

                return listItem;
            }

            // Create the mobile menu's root list.
            const mainList = document.createElement("ul");
            mainList.className = "mobile-nav-list";

            const desktopList = desktopNav.querySelector(":scope > ul");

            if (desktopList) {
                Array.from(desktopList.children).forEach(item => {
                    const builtItem = buildNavigationItem(item);

                    if (builtItem) {
                        mainList.appendChild(builtItem);
                    }
                });
            }

            panel.appendChild(mainList);

            const panelLogo = document.createElement("a");
            panelLogo.className = "mobile-panel-logo";
            panelLogo.href = resolveSitePath("index.html");
            panelLogo.setAttribute("aria-label", "Home");

            const logoImage = document.createElement("img");
            logoImage.src = resolveSitePath("images/Logo_THC/Logo_White.svg");
            logoImage.alt = "Home";

            panelLogo.appendChild(logoImage);
            panel.insertBefore(panelLogo, mainList);
            
            // -----------------------------------------------
            // Mobile title bar
            // -----------------------------------------------

            const titleBar = document.createElement("div");
            titleBar.id = "titleBar";

            const toggle = document.createElement("button");

            toggle.type = "button";
            toggle.className = "toggle";
            toggle.setAttribute("aria-label", "Open navigation");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-controls", "navPanel");

            titleBar.appendChild(toggle);

            // Home logo on the right side of the mobile title bar.
            const homeLink = document.createElement("a");

            document.body.appendChild(panel);
            document.body.appendChild(titleBar);

            // -----------------------------------------------
            // Open and close main navigation
            // -----------------------------------------------

            function closeNavigation() {
                document.body.classList.remove("navPanel-visible");

                toggle.setAttribute("aria-expanded", "false");
                toggle.setAttribute("aria-label", "Open navigation");
            }

            function openNavigation() {
                document.body.classList.add("navPanel-visible");

                toggle.setAttribute("aria-expanded", "true");
                toggle.setAttribute("aria-label", "Close navigation");
            }

            toggle.addEventListener("click", event => {
                event.preventDefault();

                const isOpen = document.body.classList.contains(
                    "navPanel-visible"
                );

                if (isOpen) {
                    closeNavigation();
                } else {
                    openNavigation();
                }
            });

            // -----------------------------------------------
            // Expand and collapse nested submenus
            // -----------------------------------------------

            panel.addEventListener("click", event => {

                const submenuToggle = event.target.closest(
                    ".mobile-submenu-toggle"
                );

                if (submenuToggle) {

                    event.preventDefault();

                    const submenuId = submenuToggle.getAttribute("aria-controls");
                    const submenu = document.getElementById(submenuId);

                    if (!submenu) return;

                    const isExpanded =
                        submenuToggle.getAttribute("aria-expanded") === "true";

                    // Show or hide the selected top-level submenu.
                    submenu.hidden = isExpanded;

                    // Also show or hide every submenu nested underneath it.
                    submenu.querySelectorAll(".mobile-submenu").forEach(nestedSubmenu => {
                        nestedSubmenu.hidden = isExpanded;
                    });

                    submenuToggle.setAttribute(
                        "aria-expanded",
                        String(!isExpanded)
                    );

                    const itemLabel = submenuToggle
                        .closest(".mobile-nav-row")
                        ?.querySelector(".mobile-nav-link, .mobile-nav-label")
                        ?.textContent.trim() || "submenu";

                    submenuToggle.setAttribute(
                        "aria-label",
                        `${isExpanded ? "Expand" : "Collapse"} ${itemLabel} submenu`
                    );

                    return;
                }

                // Selecting a real page link closes the main menu.
                if (event.target.closest(".mobile-nav-link")) {
                    closeNavigation();
                }
            });

            // -----------------------------------------------
            // Close navigation with Escape
            // -----------------------------------------------

            document.addEventListener("keydown", event => {

                if (event.key === "Escape") {
                    closeNavigation();
                }

            });

            console.log("Mobile navigation created successfully.");
        }

        createMobileNavigation();

        // -----------------------------------------------
        // Header elements
        // -----------------------------------------------

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
                    bannerElement.style.backgroundImage = `url("${poster}")`;
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
                    console.warn("Banner video could not play:", error);
                });

            } else {

                bannerElement.style.backgroundImage = `url("${banner}")`;
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