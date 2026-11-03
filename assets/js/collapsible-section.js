/**
 * Collapsible Section Component
 *
 * Allows sections to be expanded and collapsed by clicking
 * their associated toggle button.
 *
 * Required HTML:
 * - .collapsible-section
 * - .collapsible-toggle
 * - .collapsible-content
 */

(function () {
    "use strict";

    function initialiseCollapsibleSections() {

        const sections = document.querySelectorAll(".collapsible-section");

        sections.forEach(section => {

            const toggle = section.querySelector(".collapsible-toggle");
            const content = section.querySelector(".collapsible-content");

            if (!toggle || !content) {
                return;
            }

            // Ensure the toggle controls the correct content.
            if (!content.id) {
                content.id = `collapsible-content-${Math.random()
                    .toString(36)
                    .slice(2, 11)}`;
            }

            toggle.setAttribute("aria-controls", content.id);

            // Initialise the section's state.
            const initiallyExpanded =
                toggle.getAttribute("aria-expanded") === "true";

            toggle.setAttribute(
                "aria-expanded",
                String(initiallyExpanded)
            );

            content.hidden = !initiallyExpanded;

            section.classList.toggle(
                "is-open",
                initiallyExpanded
            );

            // Toggle the section when the button is clicked.
            toggle.addEventListener("click", function () {

                const isExpanded =
                    toggle.getAttribute("aria-expanded") === "true";

                const shouldExpand = !isExpanded;

                toggle.setAttribute(
                    "aria-expanded",
                    String(shouldExpand)
                );

                content.hidden = !shouldExpand;

                section.classList.toggle(
                    "is-open",
                    shouldExpand
                );

                const heading = section.querySelector(".project-section-title");

                if (heading) {
                    heading.classList.toggle("is-open", shouldExpand);
                }

            });

        });
    }

    // Initialise when the document is ready.
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialiseCollapsibleSections
        );
    } else {
        initialiseCollapsibleSections();
    }

})();