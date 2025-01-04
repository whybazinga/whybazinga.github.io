

class Program {
    id;
    #isActive;

    #windowId;
    windowElement;

    #taskbarTabId;
    taskbarTabElement;

    constructor(payload) {
        this.id = payload.id;
        this.#isActive = payload.isActive;

        this.#windowId = `window__${this.id}`;
        this.#taskbarTabId = `taskbar__program-tab__${this.id}`;
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

    addProgram() {
        windowsContainer.appendChild(this.windowElement);
        programTabsContainer.appendChild(this.taskbarTabElement);
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
}