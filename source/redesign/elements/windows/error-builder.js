const defaultErrorWindowCreateOptions = {

}

const errorWindow = {
    add: (errorWindowCreateOptions) => {
        const errorWindowFrameCreateOptions = {
            ...defaultErrorWindowCreateOptions,
            ...errorWindowCreateOptions,
            isActive: true,
            withHideButton: false,
            withFullscreenButton: false,
        };

        const errorWindowBuilder = new WindowBuilder(errorWindowFrameCreateOptions);

        const resultErrorWindow = errorWindowBuilder.build();
        resultErrorWindow.setAttribute("id", "error-window");
        resultErrorWindow.classList.add("hidden");

        const errorMessageContainer = document.createElement("div");
        errorMessageContainer.classList.add("error-window__body-container");
        errorMessageContainer.innerHTML =
        `
            <div class="error-window__body-container__icon">
                <img src="./public/resources/windows-98-msg_error-icon-32x32.png">
            </div>
            <div class="error-window__body-container__message">
                <p>
                    Please don't do that!
                </p>
            </div>
        `;

        resultErrorWindow.appendChild(errorMessageContainer);
        
        const okButtonContainer = document.createElement("div");
        okButtonContainer.classList.add("error-window__ok-button-container");
        okButtonContainer.innerHTML = `<button class="error-window__ok-button button-1 heavy">Ok</button>`;

        resultErrorWindow.appendChild(okButtonContainer);

        windowsContainer.appendChild(resultErrorWindow);
    },

    show: () => {
        const errorWindow = document.querySelector("#error-window");
        if (!errorWindow) {
            return;
        }

        if (!errorWindow.classList.contains("hidden")) {
            return;
        }

        errorWindow.classList.remove("hidden");
    },

    hide: () => {
        const errorWindow = document.querySelector("#error-window");
        if (!errorWindow) {
            return;
        }

        if (errorWindow.classList.contains("hidden")) {
            return;
        }

        errorWindow.classList.add("hidden");
    }
}