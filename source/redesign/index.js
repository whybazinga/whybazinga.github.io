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
        text: "hey",
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