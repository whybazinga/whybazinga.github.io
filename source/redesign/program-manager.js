


class ProgramManager {
    #registeredPrograms = [];
    #activeProgram = null;
    #currentError = null;

    constructor() {

    }

    registerError(error) {
        error.onOpenDelegate.subscribe(error.id, this.#createErrorOpenListener());
        error.onCloseDelegate.subscribe(error.id, this.#createErrorCloseListener());
    }

    registerProgram(program) {
        program.getWindow().addEventListener("click", this.#createClickListener(program));
        program.getTaskbarTab().addEventListener("click", this.#createClickListener(program));

        this.#registeredPrograms.push(program);
    }

    #createClickListener(owningProgram) {
        return (event) => {
            if (this.#activeProgram == owningProgram) {
                return;
            }

            if (this.#activeProgram) {
                this.#activeProgram.setActive(false);
            }

            this.#activeProgram = owningProgram;
            this.#activeProgram.setActive(true);
        };
    }

    #createErrorOpenListener() {
        return (owningError) => {
            if (this.#currentError) {
                console.error(`Trying to show error ${owningError} while error {}`)
            }

            this.#currentError = owningError;

            this.#currentError.setActive(true);
        };
    }

    #createErrorCloseListener() {
        return (owningError) => {
            this.#currentError = null;
        };
    }
}