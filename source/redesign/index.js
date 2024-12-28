// taskbar
{
    notepadWindow.add({
        idAttribute: "about-me-notepad",
        title: "About me - Notepad",
        iconPath: "./public/resources/windows-98-notepad-icon-16x16.png",
        text: "hey",
        style: {
            top: "40%",
            left: "50%",
        }
    });

    errorWindow.add({
        title: "Error!"
    });

    programTabsArea.addProgramTab("public/resources/windows-98-notepad-icon-16x16.png", "About me - Notepad", true);

    navigationArea.addProgramNotification("public/resources/windows-98-mouse-icon-16x16.png");
    navigationArea.addProgramNotification("public/resources/windows-98-loudspeaker_muted-icon-16x16.png");
}
