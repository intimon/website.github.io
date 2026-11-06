 (function($) {
	 

const projects = {
    "dreamweaver": {
        title: "Dreamweaver",
        description: "A music video exploring movement, colour and sound.",
        date: "September 2024",
        image: "images/Dreamweaver/Dreamweaver.png",
        buttonText: "View",
        link: "dreamweaver.html",
		accentColor: "#5f04ac",
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
        link: "project/free.html",
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

	 
function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-feature-card";

    card.style.setProperty(
        "--project-accent-color",
        project.accentColor || "#292d33"
    );
    
    // Video or Image Selection Logic
        const mediaPath = project.image;
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

media.className = "project-feature-image";

    const content = document.createElement("div");
    content.className = "project-feature-content";

    const title = document.createElement("h3");
    title.className = "project-feature-title";
    title.textContent = project.title;

    const description = document.createElement("p");
    description.className = "project-feature-description";
    description.textContent = project.description;

    const date = document.createElement("p");
    date.className = "project-feature-date";
    date.textContent = project.date;

    const footer = document.createElement("div");
    footer.className = "project-feature-footer";

    const button = document.createElement("a");
    button.className = "project-feature-button";
    button.href = project.link;
    button.textContent = project.buttonText || "View";
    button.setAttribute("aria-label", `${button.textContent}: ${project.title}`);

    content.append(title, description, date);
    footer.append(button);
    card.append(media, content, footer);

    return card;
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-project-card]").forEach(container => {
        const project = projects[container.dataset.projectCard];

        if (project) {
            container.replaceChildren(createProjectCard(project));
        }
    });
});

})(jQuery);