

class Program {
    id;
    #isActive;

    #windowId;
    windowElement;

    #taskbarTabId;
    taskbarTabElement;

    autoOpen = false;
    #isOpen = false;

    constructor(payload) {
        this.id = payload.id;
        this.#isActive = payload.isActive;

        this.#windowId = `window__${this.id}`;
        this.#taskbarTabId = `taskbar__program-tab__${this.id}`;

        console.log("autoOpen" in payload)

        this.autoOpen = "autoOpen" in payload ? payload.autoOpen : true;
    }

    getWindowId() {
        return this.#windowId;
    }

    getTaskbarTabId() {
        return this.#taskbarTabId;
    }

    #getWindowElement() {
        return document.querySelector(`#${this.#windowId}`);
    }

    #getTaskbarTabElement() {
        return document.querySelector(`#${this.#taskbarTabId}`);
    }

    initialize() {
        this.windowElement.classList.add("hidden");
        windowsContainer.appendChild(this.windowElement);
        this.taskbarTabElement.classList.add("hidden");
        programTabsContainer.appendChild(this.taskbarTabElement);

        if (this.autoOpen) {
            this.open();
        }
    }

    setActive(newIsActive) {
        if (this.#isActive == newIsActive) {
            return;
        }

        this.#isActive = newIsActive;

        if (this.#isActive) {
            this.#getWindowElement().classList.add("active");
            this.#getTaskbarTabElement().classList.add("active");
        } else {
            this.#getWindowElement().classList.remove("active");
            this.#getTaskbarTabElement().classList.remove("active");
        }
    }

    open() {
        if (this.#isOpen) {
            return;
        }

        this.#getWindowElement().classList.remove("hidden");
        this.#getTaskbarTabElement().classList.remove("hidden");

        this.#isOpen = true;
    }

    close() {
        if (!this.#isOpen) {
            return;
        }

        this.#getWindowElement().classList.add("hidden");
        this.#getTaskbarTabElement().classList.add("hidden");

        this.#isOpen = false;
    }
}