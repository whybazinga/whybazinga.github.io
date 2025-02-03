const windowsContainer = document.querySelector("main");

const defaultWindowFrameCreateOptions = {
    idAttribute: "",
    title: "default",
    iconPath: "",
    style: {
        top: "0px",
        left: "0px",
    },
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

        if (windowFrameCreateOptions.style) {
            newWindowFrame.style.top = windowFrameCreateOptions.style.top;
            newWindowFrame.style.left = windowFrameCreateOptions.style.left;
        }

        let optionalIconHtml = "";
        if (windowFrameCreateOptions.iconPath && windowFrameCreateOptions.iconPath.length) {
            optionalIconHtml = `<img src="${windowFrameCreateOptions.iconPath}">`;
        }

        let optionalHideButtonHtml = "";
        if (windowFrameCreateOptions.withHideButton) {
            optionalHideButtonHtml = `
            <button class="button-1 window__header__right-panel__button window-hide-button">
                <svg viewBox="0 0 12 10">
                    <rect x="2" y="7" width="6" height="2" fill="currentColor"></rect>
                </svg>
            </button>
            `;
        }

        let optionalFullscreenButtonHtml = "";
        if (windowFrameCreateOptions.withFullscreenButton) {
            optionalFullscreenButtonHtml = `
            <button class="button-1 window__header__right-panel__button not-implemented">
                <svg viewBox="0 0 12 10">
                    <rect x="1" y="0" width="9" height="9" fill="none" stroke="black" stroke-width="1"></rect>
                    <line x1="1" y1="1" x2="10" y2="1" stroke="black" stroke-width="1"></line>
                </svg>
            </button>
            `;
        }

        const windowFrameHeaderHtml =
            `
        <div class="window__header">
            <div class="window__header__left-panel">
                ${optionalIconHtml}
                <h1>${windowFrameCreateOptions.title}</h1>
            </div>
            <div class="window__header__right-panel">
                ${optionalHideButtonHtml}
                ${optionalFullscreenButtonHtml}
                <button class="button-1 window__header__right-panel__button not-implemented">
                    <svg viewBox="0 0 12 10">
                        <line x1="2" y1="2" x2="4" y2="2" stroke="black" stroke-width="1"></line>
                        <line x1="8" y1="2" x2="10" y2="2" stroke="black" stroke-width="1"></line>
                        <line x1="3" y1="3" x2="5" y2="3" stroke="black" stroke-width="1"></line>
                        <line x1="7" y1="3" x2="9" y2="3" stroke="black" stroke-width="1"></line>
                        <line x1="4" y1="4" x2="8" y2="4" stroke="black" stroke-width="1"></line>
                        <line x1="5" y1="5" x2="7" y2="5" stroke="black" stroke-width="1"></line>
                        <line x1="4" y1="6" x2="8" y2="6" stroke="black" stroke-width="1"></line>
                        <line x1="3" y1="7" x2="5" y2="7" stroke="black" stroke-width="1"></line>
                        <line x1="7" y1="7" x2="9" y2="7" stroke="black" stroke-width="1"></line>
                        <line x1="2" y1="8" x2="4" y2="8" stroke="black" stroke-width="1"></line>
                        <line x1="8" y1="8" x2="10" y2="8" stroke="black" stroke-width="1"></line>
                    </svg>
                </button>
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
        const newTab = document.createElement("button");
        newTab.classList.add("window__file-tabs__tab");
        newTab.classList.add("not-implemented");
        newTab.innerHTML = title;

        this.tabsContainer.appendChild(newTab);

        return this;
    }

    build() {
        return this.tabsContainer;
    }
}
