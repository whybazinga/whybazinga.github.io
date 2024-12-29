//desktop
{
    errorWindow.add({
        idAttribute: "error-window",
        title: "Error!"
    });

    imageViewer.add({
        idAttribute: "image-viewer-window",
        title: "Image Viewer",
        imageSrc: "./public/resources/image-viewer-content-256x128.png",
        style: {
            top: "7%",
            left: "13%",
        }
    });

    notepadWindow.add({
        idAttribute: "about-me-notepad",
        title: "About me - Notepad",
        iconPath: "./public/resources/windows-98-notepad-icon-16x16.png",
        text: `

            Hey there! My name is Alex,
                        though you might know me as WBZN if you’re into gaming 
                                    ..and prefer tags over names.
            

            I am a Software Engineer with experience in Game (5+yrs) and Web (2yr) development.

            Below, you’ll find some of my links, feel free to check them out!

            Linkedin: https://www.linkedin.com/in/whybazinga/
            Github: https://github.com/whybazinga
            Mastodon: https://mastodon.gamedev.place/@whybazinga




                        This small website is a spontaneous adventure I started one evening. 
                        
                        The only dependency this project has is LessCSS (https://lesscss.org/),
                        that totally saved me from going insane writing in pure CSS.
                        
                        That’s not to say that everything else is straightforward—it’s been a long time
                        since I’ve written in JavaScript! 
                        
                        However, it was a fun experience, and that’s what matters most.

        `,
        style: {
            top: "13%",
            left: "40%",
        }
    });
}

// taskbar
{
    programTabsArea.addProgramTab("public/resources/windows-98-notepad-icon-16x16.png", "About me - Notepad", true);

    navigationArea.addProgramNotification("public/resources/windows-98-mouse-icon-16x16.png");
    navigationArea.addProgramNotification("public/resources/windows-98-loudspeaker_muted-icon-16x16.png");
}

// buttons binding
{
    const casualButtons = document.querySelectorAll("button:not(.error-window__ok-button)");
    casualButtons.forEach((button) => {
        button.addEventListener("click", () => {
            console.log("!");
            errorWindow.show();
        });
    })

    const errorButton = document.querySelector(".error-window__ok-button");
    errorButton.addEventListener("click", () => {
        errorWindow.hide();
    });
}