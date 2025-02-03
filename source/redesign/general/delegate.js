


class Delegate {
    #invocationList = {};

    constructor() {
        
    }

    subscribe(sourceId, callback) {
        if (this.#invocationList[sourceId]) {
            console.warn(`Source ${sourceId} overrides ${this} delegate's callback`);
        }

        this.#invocationList[sourceId] = callback;
    }

    unsubscribe(sourceId) {
        this.#invocationList[sourceId] = null;
    }

    broadcast(...args) {
        Object.values(this.#invocationList).forEach(callback => callback(...args));
    }
}