


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
        program.getWindow().addEventListener("click", this.#createWindowClickListener(program));
        program.getTaskbarTab().addEventListener("click", this.#createTaskbarTabClickListener(program));

        this.#registeredPrograms.push(program);
    }

    #isShowingError() {
        return !!this.#currentError;
    }

    #switchActivity(fromProgram, toProgram) {
        if (fromProgram) {
            fromProgram.setActive(false);
        }

        if (toProgram) {
            toProgram.setActive(true);
        }
    }

    #createWindowClickListener(owningProgram) {
        return (event) => {
            if (this.#isShowingError()) {
                return;
            }

            if (this.#activeProgram == owningProgram) {
                return;
            }

            this.#switchActivity(this.#activeProgram, owningProgram);
            this.#activeProgram = owningProgram;
        };
    }

    #createTaskbarTabClickListener(owningProgram) {
        return (event) => {
            if (this.#isShowingError()) {
                return;
            }

            if (this.#activeProgram == owningProgram && !this.#activeProgram.isHidden()) {
                this.#switchActivity(this.#activeProgram, null);
                this.#activeProgram.hide();

                this.#activeProgram = null;

                return;
            }

            this.#switchActivity(this.#activeProgram, owningProgram);
            this.#activeProgram = owningProgram;

            if (this.#activeProgram.isHidden()) {
                this.#activeProgram.unhide();
            }
        };
    }

    #createErrorOpenListener() {
        return (owningError) => {
            if (this.#currentError) {
                console.error(`Trying to show error ${owningError} while error {}`)
            }

            this.#switchActivity(this.#activeProgram, owningError);
            this.#activeProgram = null;
            this.#currentError = owningError;
        };
    }

    #createErrorCloseListener() {
        return (owningError) => {
            this.#currentError = null;
        };
    }
}