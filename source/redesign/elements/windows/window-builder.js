const windowsContainer = document.querySelector("main");

const defaultWindowFrameCreateOptions = {
    idAttribute: "",
    title: "default",
    iconPath: "",
    isActive: true,
    withHideButton: true,
    withFullscreenButton: true,
}

class WindowBuilder {
    constructor(windowFrameCreateOptions = defaultWindowFrameCreateOptions) {
        const newWindowFrame = document.createElement("div");

        if (windowFrameCreateOptions.idAttribute && windowFrameCreateOptions.idAttribute.length) {
            newWindowFrame.setAttribute("id", windowFrameCreateOptions.idAttribute);
        }

        newWindowFrame.classList.add("window");

        let optionalIconHtml = "";
        if (windowFrameCreateOptions.iconPath && windowFrameCreateOptions.iconPath.length) {
            optionalIconHtml = `<img src="${windowFrameCreateOptions.iconPath}">`;
        }

        let optionalHideButtonHtml = "";
        if (windowFrameCreateOptions.withHideButton) {
            optionalHideButtonHtml = `<button class="button-1 window__header__right-panel__button">_</button>`;
        }

        let optionalFullscreenButtonHtml = "";
        if (windowFrameCreateOptions.withHideButton) {
            optionalFullscreenButtonHtml = `<button class="button-1 window__header__right-panel__button">o</button>`;
        }

        const windowFrameHeaderHtml =
            `
        <div class="window__header ${windowFrameCreateOptions.isActive ? "active" : ""}">
            <div class="window__header__left-panel">
                ${optionalIconHtml}
                <h1>${windowFrameCreateOptions.title}</h1>
            </div>
            <div class="window__header__right-panel">
                ${optionalHideButtonHtml}
                ${optionalFullscreenButtonHtml}
                <button class="button-1 window__header__right-panel__button">x</button>
            </div>
        </div>
        `;

        newWindowFrame.innerHTML = windowFrameHeaderHtml;

        this.windowFrame = newWindowFrame;
    }

    addFileTabs(preparedFileTabsContainer) {
        this.windowFrame.appendChild(preparedFileTabsContainer);

        return this;
    }

    build() {
        return this.windowFrame;
    }
}


class WindowFileTabsBuilder {
    constructor() {
        const newTabsContainer = document.createElement("div");
        newTabsContainer.classList.add("window__file-tabs");

        this.tabsContainer = newTabsContainer;
    }

    addTab(title) {
        const newTab = document.createElement("div");
        newTab.classList.add("window__file-tabs__tab");
        newTab.innerHTML = title;

        this.tabsContainer.appendChild(newTab);

        return this;
    }

    build() {
        return this.tabsContainer;
    }
}
