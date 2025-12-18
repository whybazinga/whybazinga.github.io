// taskbar
{
    navigationArea.addProgramNotification("public/resources/windows-98-mouse-icon-16x16.png");
    navigationArea.addProgramNotification("public/resources/windows-98-loudspeaker_muted-icon-16x16.png");
}

// === About Me Notepad ===

const aboutMeNotepadProgram = new Program({ 
    id: "about-me-notepad",
});

{
    const aboutMeNotepadWindowElement = notepadWindow.build({
        idAttribute: aboutMeNotepadProgram.getWindowId(),
        title: "About me - Notepad",
        iconPath: "./public/resources/windows-98-notepad-icon-16x16.png",
        text: `

            Hey there! My name is Alex,
                        ...or WBZN if you prefer tags over names :)
            

            I am a Software Engineer with experience in Game (6+yrs) and Web (2yr) development.

            Below, you'll find some of my links, feel free to check them out!

            Linkedin: https://www.linkedin.com/in/whybazinga/
            Github: https://github.com/whybazinga
            Mastodon: https://mastodon.gamedev.place/@whybazinga



                        This small website is a spontaneous adventure I started one evening. 
                        
                        The only dependency this project has is LessCSS (https://lesscss.org/),
                        that totally saved me from going insane writing in pure CSS.
                        
                        That's not to say that everything else is straightforward - it's been a long time
                        since I've written in JavaScript! 
                        
                        However, it was a fun experience, and that's what matters most.




            Also feel free to check out my Global Game Jam 2025 submission:

            Did you hear what happened to Luca Brasi?
            Cooperative real-time chess knights fighting game.
            https://globalgamejam.org/games/2025/did-you-hear-what-happened-luca-brasi-1

        `,
        style: {
            top: "13%",
            left: "40%",
        }
    });

    const aboutMeNotepadTaskbarProgramTabElement = programTabsArea.buildTab(
        aboutMeNotepadProgram.getTaskbarTabId(),
        "public/resources/windows-98-notepad-icon-16x16.png",
        "About me - Notepad"
    );

    aboutMeNotepadProgram.windowElement = aboutMeNotepadWindowElement;
    aboutMeNotepadProgram.taskbarTabElement = aboutMeNotepadTaskbarProgramTabElement;

    aboutMeNotepadProgram.initialize();
}

// ========================

// === My Image Viewer ====

const myImageViewerProgram = new Program({
    id: "my-image-viewer"
});

{
    const myImageViewerWindowElement = imageViewerWindow.build({
        idAttribute: myImageViewerProgram.getWindowId(),
        title: "Image Viewer",
        iconPath: "./public/resources/windows-98-utopia-smiley-icon-16x16.png",
        imageSrc: "./public/resources/image-viewer-content-256x128.png",
        style: {
            top: "7%",
            left: "13%",
        }
    });

    const myImageViewerTaskbarProgramTabElement = programTabsArea.buildTab(
        myImageViewerProgram.getTaskbarTabId(),
        "./public/resources/windows-98-utopia-smiley-icon-16x16.png",
        "Image Viewer"
    );

    myImageViewerProgram.windowElement = myImageViewerWindowElement;
    myImageViewerProgram.taskbarTabElement = myImageViewerTaskbarProgramTabElement;

    myImageViewerProgram.initialize();
}

// ========================

// ===== Game Of Life =====

const myGameOfLifeProgram = new Program({
    id: "my-game-of-life"
});

{
    const myGameOfLifeWindowElement = gameOfLifeWindow.build({
        idAttribute: myGameOfLifeProgram.getWindowId(),
        title: "Game of Life",
        iconPath: "./public/resources/windows-98-world-16x16.png",
        style: {
            top: "36%",
            left: "18%",
        }
    });

    const myGameOfLifeTaskbarProgramTabElement = programTabsArea.buildTab(
        myGameOfLifeProgram.getTaskbarTabId(),
        "./public/resources/windows-98-world-16x16.png",
        "Game of Life"
    );

    myGameOfLifeProgram.windowElement = myGameOfLifeWindowElement;
    myGameOfLifeProgram.taskbarTabElement = myGameOfLifeTaskbarProgramTabElement;

    myGameOfLifeProgram.initialize();
}

// ========================

// ======== Error =========

const myErrorProgram = new Program({
    id: "error",
    autoOpen: false,
});

{
    const myErrorWindowElement = errorWindow.build({
        idAttribute: myErrorProgram.getWindowId(),
        title: "Error!"
    });

    const myErrorTaskbarProgramTabElement = programTabsArea.buildTab(
        myErrorProgram.getTaskbarTabId(),
        null,
        "Error!"
    );

    myErrorProgram.windowElement = myErrorWindowElement;
    myErrorProgram.taskbarTabElement = myErrorTaskbarProgramTabElement;

    myErrorProgram.initialize();
}

// ========================

// Manager registration

const manager = new ProgramManager();
manager.registerProgram(aboutMeNotepadProgram);
manager.registerProgram(myImageViewerProgram);
manager.registerProgram(myGameOfLifeProgram);
manager.registerError(myErrorProgram);


// buttons binding
{
    const casualButtons = document.querySelectorAll("button.not-implemented");
    casualButtons.forEach((button) => {
        button.addEventListener("click", () => {
            myErrorProgram.open();
        });
    })

    const errorButton = document.querySelector(".error-window__ok-button");
    errorButton.addEventListener("click", () => {
        myErrorProgram.close();
    });
}
