

class Program {
    id;
    #isActive;

    #windowId;
    windowElement;

    #taskbarTabId;
    taskbarTabElement;

    autoOpen = false;
    #isOpen = false;

    #isHidden = false;

    // args: this Program
    onOpenDelegate;
    // args: this Program
    onCloseDelegate;

    constructor(payload) {
        this.id = payload.id;
        this.#isActive = payload.isActive;

        this.#windowId = `window__${this.id}`;
        this.#taskbarTabId = `taskbar__program-tab__${this.id}`;

        this.autoOpen = "autoOpen" in payload ? payload.autoOpen : true;

        this.onOpenDelegate = new Delegate();
        this.onCloseDelegate = new Delegate();
    }

    getWindowId() {
        return this.#windowId;
    }

    getWindow() {
        return this.windowElement;
    }

    getWindowHideButton() {
        return document.querySelector(`#${this.getWindowId()} .window-hide-button`);
    }

    getTaskbarTabId() {
        return this.#taskbarTabId;
    }

    getTaskbarTab() {
        return this.taskbarTabElement;
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

        this.onOpenDelegate.broadcast(this);
    }

    close() {
        if (!this.#isOpen) {
            return;
        }

        this.#getWindowElement().classList.add("hidden");
        this.#getTaskbarTabElement().classList.add("hidden");

        this.#isOpen = false;

        this.onCloseDelegate.broadcast(this);
    }

    isHidden() {
        return this.#isHidden;
    }

    hide() {
        if (!this.#isOpen) {
            console.error(`Can't hide closed window ${this}`);
            return;
        }

        if (this.#isHidden) {
            return;
        }

        this.#getWindowElement().classList.add("hidden");

        this.#isHidden = true;
    }

    unhide() {
        if (!this.#isOpen) {
            console.error(`Can't unhide closed window ${this}`);
            return;
        }

        if (!this.#isHidden) {
            return;
        }

        this.#getWindowElement().classList.remove("hidden");

        this.#isHidden = false;
    }
}