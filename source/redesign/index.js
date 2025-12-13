// taskbar
{
    navigationArea.addProgramNotification("public/resources/windows-98-mouse-icon-16x16.png");
    navigationArea.addProgramNotification("public/resources/windows-98-loudspeaker_muted-icon-16x16.png");
}

// About Me Notepad

const aboutMeNotepad = new Program({ 
    id: "about-me-notepad",
});

const aboutMeNotepadWindow = notepadWindow.build({
    idAttribute: aboutMeNotepad.getWindowId(),
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

const aboutMeNotepadTaskbarProgramTab = programTabsArea.buildTab(
    aboutMeNotepad.getTaskbarTabId(),
    "public/resources/windows-98-notepad-icon-16x16.png",
    "About me - Notepad"
);

aboutMeNotepad.windowElement = aboutMeNotepadWindow;
aboutMeNotepad.taskbarTabElement = aboutMeNotepadTaskbarProgramTab;

aboutMeNotepad.initialize();

// My Image Viewer

const myImageViewer = new Program({
    id: "my-image-viewer"
});

const myImageViewerWindow = imageViewer.build({
    idAttribute: myImageViewer.getWindowId(),
    title: "Image Viewer",
    iconPath: "./public/resources/windows-98-utopia-smiley-icon-16x16.png",
    imageSrc: "./public/resources/image-viewer-content-256x128.png",
    style: {
        top: "7%",
        left: "13%",
    }
});

const myImageViewerTaskbarProgramTab = programTabsArea.buildTab(
    myImageViewer.getTaskbarTabId(),
    "./public/resources/windows-98-utopia-smiley-icon-16x16.png",
    "Image Viewer"
);

myImageViewer.windowElement = myImageViewerWindow;
myImageViewer.taskbarTabElement = myImageViewerTaskbarProgramTab;

myImageViewer.initialize();

// Game Of Life Window

const myGameOfLife = new Program({
    id: "my-game-of-life"
});

const myGameOfLifeWindow = gameOfLifeWindow.build({
    idAttribute: myGameOfLife.getWindowId(),
    title: "Game of Life",
    iconPath: "./public/resources/windows-98-world-16x16.png",
    style: {
        top: "36%",
        left: "18%",
    }
});

const myGameOfLifeTaskbarProgramTab = programTabsArea.buildTab(
    myGameOfLife.getTaskbarTabId(),
    "./public/resources/windows-98-world-16x16.png",
    "Game of Life"
);

myGameOfLife.windowElement = myGameOfLifeWindow;
myGameOfLife.taskbarTabElement = myGameOfLifeTaskbarProgramTab;

myGameOfLife.initialize();

// Error

const myError = new Program({
    id: "error",
    autoOpen: false,
});

const myErrorWindow = errorWindow.build({
    idAttribute: myError.getWindowId(),
    title: "Error!"
});

const myErrorTaskbarProgramTab = programTabsArea.buildTab(
    myError.getTaskbarTabId(),
    null,
    "Error!"
);

myError.windowElement = myErrorWindow;
myError.taskbarTabElement = myErrorTaskbarProgramTab;

myError.initialize();

// Manager registration

const manager = new ProgramManager();
manager.registerProgram(aboutMeNotepad);
manager.registerProgram(myImageViewer);
manager.registerProgram(myGameOfLife);
manager.registerError(myError);


// buttons binding
{
    const casualButtons = document.querySelectorAll("button.not-implemented");
    casualButtons.forEach((button) => {
        button.addEventListener("click", () => {
            myError.open();
        });
    })

    const errorButton = document.querySelector(".error-window__ok-button");
    errorButton.addEventListener("click", () => {
        myError.close();
    });
}
