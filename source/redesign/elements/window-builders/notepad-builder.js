const defaultNotepadWindowCreateOptions = {
    idAttribute: "",
    title: "",
    iconPath: "",
    text: "",
    style: {
        top: "0px",
        left: "0px",
    },
}

const notepadWindow = {
    build: (notepadWindowCreateOptions = defaultNotepadWindowCreateOptions) => {
        const notepadWindowFrameCreateOptions = {
            ...notepadWindowCreateOptions,
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
                ${notepadWindowCreateOptions.text}
        </textarea>
        `;

        const resultNotepadWindow = notepadWindowBuilder.build();
        resultNotepadWindow.classList.add("notepad");

        resultNotepadWindow.appendChild(notepadWindowField);

        return resultNotepadWindow;
    },
}