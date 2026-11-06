// This Java Script file makes a Reusable Template for the Project Boxes used all over the site!
// To Create a box copy and fill out on of the Templates in the 'Const porject =' Section. Once this is done it can be easily called in the HTML file where needed.

 (function($) {
	 
     //Any new Project Boxes Created go in here: Two Section at the moment Projects, and Featured Projects
        const projects = {
            "dreamweaver": {
                title: "Dreamweaver",           // This is the thick headline
                description: "A music video exploring movement, colour and sound.",         //This is the Desciption Body Copy
                date: "September 2024",         // This is the Date but may be also used as a Role, or Team Box
                image: "images/Dreamweaver/Dreamweaver.png",        //File solution for the Picture/Videos in the box
                buttonText: "View",             // This is what will be written in the Button
                link: "dreamweaver.html",       // This is where the button links to
                accentColor: "#5f04ac",         // This is the accent colour for hover, etc.
            },

            "MBWI": {
                title: "MBWI",
                description: "Rebranding for STV MBWI in Graz",
                date: "March 2024",
                image: "images/MBWI/Motion_Graphics_Graz.mp4",
                alt: "Project MBWI",
                buttonText: "View",
                link: "MBWI.html",
                accentColor: "rgb(155, 195, 55)",
            },

            "Free": {
                title: "Free",
                description: "Masters Project",
                date: "Summer 2025",
                image: "images/Free/Free_Video.mov",
                alt: "Masters Project: Free",
                buttonText: "View",
                link: "/project/free.html",
                accentColor: "#9466a8",
            },

            "Snare": {
                title: "Snare",
                description: "Fan Animation Warhammer",
                date: "Late 2024",
                image: "images/Snare/Foot.mp4",
                alt: "Snare: Warhammer Fan Animation",
                buttonText: "View",
                link: "snare.html",
                accentColor: "#d02681",
            },

            "Attribute Manager": {
                title: "Attribute Manager",
                description: "Maya Attribute Plugin",
                date: "Summer 2026",
                image: "images/Attribute_Manager/Attribute_Manager.png",
                alt: "Attribute Manager",
                buttonText: "View",
                link: "attribute_manager.html",
                accentColor: "#5d7ce1",
            },

            // Featured Projects
            "RTR": {
                title: "Realtime Roads",
                description: "by Morgan Skillicorn",
                date: "Role: DoP & Camera Work",
                image: "images/RTR/Morgan_car.png",
                alt: "Realtime Roads by Morgan Skillicorn",
                link: "https://www.youtube.com/watch?v=BWxVeWIF-lQ",
                buttonText: "View",
                accentColor: "#3a186f",
            },



            "Maja": {
                title: "The Essence - Music Video",
                description: "by Maja Oszczypała",
                date: "Role: DoP & Camera Work",
                image: "images/Maja/Maja.png",
                alt: "The Essence - Music Video",
                link: "https://www.youtube.com/watch?v=UuvOBrjxg_0",
                buttonText: "View",
                accentColor: "#e5183f",
            },

            "Dave": {
                title: "Shortfilm Production",
                description: "by David Muddie",
                date: "Role: VP Operator",
                image: "images/Dave_Mudie/Shortfilm_Mudie.png",
                alt: "Attribute Manager",
                link: "attribute_manager.html",
                buttonText: "Coming Soon",
                accentColor: "#b85c38",
                },

        };

    // This is the Function for creating the Box
    function createProjectCard(project) {
        
        // Creating the Element and the Class
        const card = document.createElement("article");
        card.className = "project-feature-card";
        
        //Color
        card.style.setProperty(
            "--project-accent-color",
            project.accentColor || "#292d33"
        );

        // Video or Image Selection Logic
            const mediaPath = resolveSitePath(project.image);
            const isVideo = /\.(mp4|webm|mov)(?:$|[?#])/i.test(mediaPath);

            let media;

            if (isVideo) {
                media = document.createElement("video");
                media.src = mediaPath;
                media.autoplay = true;
                media.muted = true;
                media.loop = true;
                media.playsInline = true;
                media.preload = "metadata";
                media.setAttribute("aria-label", project.alt || project.title);
            } else {
                media = document.createElement("img");
                media.src = mediaPath;
                media.alt = project.alt || project.title;
                media.loading = "lazy";
            }

        //Media
        media.className = "project-feature-image";

        const content = document.createElement("div");
        content.className = "project-feature-content";
        
        //Title
        const title = document.createElement("h3");
        title.className = "project-feature-title";
        title.textContent = project.title;
        
        //Body Copy
        const description = document.createElement("p");
        description.className = "project-feature-description";
        description.textContent = project.description;
        
        //Date
        const date = document.createElement("p");
        date.className = "project-feature-date";
        date.textContent = project.date;

        const footer = document.createElement("div");
        footer.className = "project-feature-footer";
        
        // Button
        const button = document.createElement("a");
        button.className = "project-feature-button";
        button.href = resolveSitePath(project.link);
        button.textContent = project.buttonText || "View";
        button.setAttribute("aria-label", `${button.textContent}: ${project.title}`);
        
        //Structure
        content.append(title, description, date);
        footer.append(button);
        card.append(media, content, footer);
        
        //End of function
        return card;
}
     
    // Find and place called Projects
    function loadProjectCards() {

        document.querySelectorAll("[data-project-card]").forEach(container => {

            const project = projects[container.dataset.projectCard];

            if (project) {
                container.replaceChildren(createProjectCard(project));
            }

        });

    }

    // Run when the DOM is ready, or immediately if it already is.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadProjectCards);
    } else {
        loadProjectCards();
    }

    })(jQuery);