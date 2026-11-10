// This Java Script file makes a Reusable Template for the Project Boxes used all over the site!
// To Create a box copy and fill out on of the Templates in the 'Const porject =' Section. Once this is done it can be easily called in the HTML file where needed.

 (function($) {
	 
     //Any new Project Boxes Created go in here: Two Section at the moment Projects, and Featured Projects
        const projects = {
            "dreamweaver": {
                title: "Dreamweaver",           // This is the thick headline
                description: "A music video exploring movement, colour and sound.",         //This is the Desciption Body Copy
                date: "September 2024",         // This is the Date but may be also used as a Role, or Team Box
                image: "images/Dreamweaver/Dreamweaver.webp",        //File solution for the Picture/Videos in the box
                buttonText: "Coming Soon!",             // This is what will be written in the Button
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
                image: "images/Free/Free_Video.mp4",
                alt: "Masters Project: Free",
                buttonText: "View",
                link: "projects/free.html",
                accentColor: "#9466a8",
            },

            "Snare": {
                title: "Snare",
                description: "Fan Animation Warhammer",
                date: "Late 2024",
                image: "images/Snare/Foot.mp4",
                alt: "Snare: Warhammer Fan Animation",
                buttonText: "View",
                link: "projects/snare.html",
                accentColor: "#d02681",
            },

            "Attribute Manager": {
                title: "Attribute Manager",
                description: "Maya Attribute Plugin",
                date: "Summer 2026",
                image: "images/Attribute_Manager/Attribute_Manager.webp",
                alt: "Attribute Manager",
                buttonText: "View",
                link: "attribute_manager.html",
                accentColor: "#5d7ce1",
            },
            
            "Flourishing Beyond": {
                title: "Flourishing Beyond",
                description: "Procedural Animation Project",
                date: "Spring 2025",
                image: "images/Flourishing_Beyond/No_Framing.mp4",
                alt: "Flourishing Beyond",
                buttonText: "View",
                link: "projects/flourishing_beyond.html",
                accentColor: "#cd5d19",
            },
            
            "Roto": {
                title: "Elena Animation",
                description: "Rotoscoping Animation",
                date: "Spring 2023",
                image: "images/Elena/Animation_Elena.mp4",
                alt: "Rotoscoping Animation",
                buttonText: "View",
                link: "projects/rotoscoping.html",
                accentColor: "#fff000",
            },

            "Duck": {
                title: "What the Duck",
                description: "2D Animation Project",
                date: "Fall 2022",
                image: "images/What_the_Duck/What the duck!.mp4",
                alt: "What the duck! Animation Short",
                buttonText: "View",
                link: "projects/what_the_duck.html",
                accentColor: "#ffe000",
            },
            
            "Top Notch": {
                title: "Top Notch Cafe",
                description: "Cafe Menu Redesign",
                date: "Summer 2025",
                image: "images/Top_Notch/Menu_Mock_Up.webp",
                alt: "Menu Redesign",
                buttonText: "View",
                link: "projects/top-notch.html",
                accentColor: "#c02d31",
            },
            
            "THC": {
                title: "Personal Logo",
                description: "Own Brand Design",
                date: "Summer 2024",
                image: "images/Logo_THC/Logo_Loop.mp4",
                alt: "Logo Animation",
                buttonText: "View",
                link: "projects/THC.html",
                accentColor: "rgba(70, 115, 170, 1)",
            },
            
// needs work
            "Neverending": {
                title: "Michael Ende Covers",
                description: "Book Cover Design",
                date: "Spring 2019",
                image: "images/Book/Cover_Design.webp",
                alt: "Logo Animation",
                buttonText: "View",
                link: "projects/LOI.html",
                accentColor: "rgb(58, 58, 58)",
            },
            
            "LOI": {
                title: "Library of Inspiration",
                description: "Project to Inspire Kids for future Careers",
                date: "2024",
                image: "images/LOI/LOI_Animation.mp4",
                alt: "Logo Animation",
                buttonText: "View",
                link: "projects/THC.html",
                accentColor: "rgba(70, 115, 170, 1)",
            },

            
            // Featured Projects ----------------------------
            "RTR": {
                title: "Realtime Roads",
                description: "by Morgan Skillicorn",
                date: "Role: DoP & Camera Work",
                image: "images/RTR/Morgan_car.webp",
                alt: "Realtime Roads by Morgan Skillicorn",
                link: "https://www.youtube.com/watch?v=BWxVeWIF-lQ",
                buttonText: "View",
                accentColor: "#3a186f",
            },

            "Maja": {
                title: "The Essence - Music Video",
                description: "by Maja Oszczypała",
                date: "Role: DoP & Camera Work",
                image: "images/Maja/Maja.webp",
                alt: "The Essence - Music Video",
                link: "https://www.youtube.com/watch?v=UuvOBrjxg_0",
                buttonText: "View",
                accentColor: "#e5183f",
            },

            "Dave": {
                title: "Shortfilm Production",
                description: "by David Muddie",
                date: "Role: VP Operator",
                image: "images/Dave_Mudie/Shortfilm_Mudie.webp",
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