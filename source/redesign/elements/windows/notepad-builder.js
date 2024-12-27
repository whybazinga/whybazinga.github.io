const notepadWindow = {
    add: (idAttribute, title, iconPath, text) => {
        const notepadWindowFrameCreateOptions = {
            idAttribute,
            title,
            iconPath,
            isActive: true,
            withHideButton: true,
            withFullscreenButton: true,
        };

        const notepadWindowBuilder = new WindowBuilder(notepadWindowFrameCreateOptions);

        const notepadWindowFileTabsBuilder = new WindowFileTabsBuilder();
        notepadWindowFileTabsBuilder.addTab("File").addTab("Edit").addTab("Search").addTab("Help");

        notepadWindowBuilder.addFileTabs(notepadWindowFileTabsBuilder.build());

        const notepadWindowField = document.createElement("div");
        notepadWindowField.classList.add("window__field");
        notepadWindowField.innerHTML =
            `
        <textarea class="window__field__notepad-textarea with-custom-scrollbar">
                ${text}
        </textarea>
        `;

        const resultNotepadWindow = notepadWindowBuilder.build();
        resultNotepadWindow.appendChild(notepadWindowField);

        windowsContainer.appendChild(resultNotepadWindow);
    }
}