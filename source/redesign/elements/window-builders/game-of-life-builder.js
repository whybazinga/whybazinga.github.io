class ConwaysGameOfLife {
    constructor(boardCanvas, boardHeight, boardWidth, cellSize, aliveCellFillColor, targetTicksDeltaMs) {
        this.boardCanvas = boardCanvas;
        this.cellSize = cellSize;

        this.boardHeight = boardHeight;
        this.verticalCellsCount = Math.floor(this.boardHeight / this.cellSize);
        this.boardWidth = boardWidth;
        this.horizontalCellsCount = Math.floor(this.boardWidth / this.cellSize);

        this.aliveCellFillColor = aliveCellFillColor;

        this.targetTicksDeltaMs = targetTicksDeltaMs;
        this.passedTimeMs = 0;

        this.board = new Array(this.verticalCellsCount);
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(this.horizontalCellsCount);
            this.board[i].fill(false);
        }
    }

    static #getAliveNeighboursCount(inBoard, i, j) {
        let aliveNeighboursCount = 0;

        if (i > 0) {
            aliveNeighboursCount += ConwaysGameOfLife.isCellAlive(inBoard, i - 1, j); // top
        }

        if (i < inBoard.length - 1) {
            aliveNeighboursCount += ConwaysGameOfLife.isCellAlive(inBoard, i + 1, j); // bottom
        }

        if (j > 0) {
            aliveNeighboursCount += ConwaysGameOfLife.isCellAlive(inBoard, i, j - 1); // left
        }

        if (j < inBoard[i].length - 1) {
            aliveNeighboursCount += ConwaysGameOfLife.isCellAlive(inBoard, i, j + 1); // right
        }

        if (i > 0 && j > 0) {
            aliveNeighboursCount += ConwaysGameOfLife.isCellAlive(inBoard, i - 1, j - 1); // top left
        }

        if (i > 0 && j < inBoard[i].length - 1) {
            aliveNeighboursCount += ConwaysGameOfLife.isCellAlive(inBoard, i - 1, j + 1); // top right
        }

        if (i < inBoard.length - 1 && j > 0) {
            aliveNeighboursCount += ConwaysGameOfLife.isCellAlive(inBoard, i + 1, j - 1); // bottom left
        }

        if (i < inBoard.length - 1 && j < inBoard[i].length - 1) {
            aliveNeighboursCount += ConwaysGameOfLife.isCellAlive(inBoard, i + 1, j + 1); // bottom right
        }

        return aliveNeighboursCount;
    }

    /**
     * @param {bool[][]} inBoard - a board to simulate on.
     * 
     * From the rules: Each generation is a pure function of the preceding one.
     */
    static simulateLifeOn(inBoard) {
        // operate on a snapshot so that in-tick changes don't affect the result of the later iterations.
        let boardSnapshot = inBoard.map(arr => arr.slice());

        for (let i = 0; i < inBoard.length; i++) {
            for (let j = 0; j < inBoard[i].length; j++) {
                const aliveNeighboursCount = ConwaysGameOfLife.#getAliveNeighboursCount(inBoard, i, j);

                if (ConwaysGameOfLife.isCellAlive(inBoard, i, j)) {
                    // underpopulation
                    if (aliveNeighboursCount < 2) {
                        ConwaysGameOfLife.setCellAlive(boardSnapshot, i, j, false);
                    }
                    // overpopulation
                    if (aliveNeighboursCount > 3) {
                        ConwaysGameOfLife.setCellAlive(boardSnapshot, i, j, false);
                    }
                } else {
                    // reproduction
                    if (aliveNeighboursCount === 3) {
                        ConwaysGameOfLife.setCellAlive(boardSnapshot, i, j, true)
                    }
                }
            }
        }

        return boardSnapshot;
    }

    /**
     * For convinient presetting of previousFrameEndTimestamp on the first requestAnimationFrame
     */
    firstUpdate(lastFrameEndTimestamp) {
        this.previousFrameEndTimestamp = lastFrameEndTimestamp;

        window.requestAnimationFrame(this.update.bind(this));
    }

    /** 
     * On-tick updates of simulation and render
     */
    update(lastFrameEndTimestamp) {
        window.requestAnimationFrame(this.update.bind(this));

        const deltaTimeMs = lastFrameEndTimestamp - this.previousFrameEndTimestamp;
        this.previousFrameEndTimestamp = lastFrameEndTimestamp;
        this.passedTimeMs += deltaTimeMs;


        if (this.passedTimeMs < this.targetTicksDeltaMs) {
            return;
        }

        this.passedTimeMs = 0;

        ConwaysGameOfLife.clearBoard(this.boardCanvas);
        ConwaysGameOfLife.drawBoard(this.boardCanvas, this.board, this.cellSize, this.aliveCellFillColor);

        this.board = ConwaysGameOfLife.simulateLifeOn(this.board);
    }

    static isCellAlive(inBoard, i, j) {
        return inBoard[i][j];
    }

    static setCellAlive(inBoard, i, j, newAlive)
    {
        inBoard[i][j] = newAlive;
    }

    static drawAliveCell(inCanvas, inCellSize, i, j, inAliveCellFillColor) {
        const ctx = inCanvas.getContext("2d");

        const y = i * inCellSize;
        const x = j * inCellSize;

        ctx.fillStyle = inAliveCellFillColor;
        ctx.fillRect(x, y, inCellSize, inCellSize);
    }

    static clearBoard(inCanvas)
    {
        const ctx = inCanvas.getContext("2d");
        ctx.clearRect(0,0, inCanvas.width, inCanvas.height);
    }

    static drawBoard(inCanvas, inBoard, inCellSize, inAliveCellFillColor) {
        for (let i = 0; i < inBoard.length; i++) {
            for (let j = 0; j < inBoard[i].length; j++) {
                if (ConwaysGameOfLife.isCellAlive(inBoard, i, j)) {
                    ConwaysGameOfLife.drawAliveCell(inCanvas, inCellSize, i, j, inAliveCellFillColor);
                }
            }
        }
    }
}

const gameOfLifeWindow = {
    build: (gameOfLifeCreateOptions) => {
        const gameOfLifeFrameCreateOptions = {
            ...gameOfLifeCreateOptions,
            withHideButton: true,
            withFullscreenButton: true,
        };

        const gameOfLifeBuilder = new WindowBuilder(gameOfLifeFrameCreateOptions);

        const resultGameOfLifeWindow = gameOfLifeBuilder.build();

        const windowField = document.createElement("div");
        windowField.classList.add("window__field");

        const BOARD_HEIGHT = 256;
        const BOARD_WIDTH = 256;
        const CELL_SIZE = 4;
        const ALIVE_CELL_FILL_COLOR = "rgb(0,0,0)";
        const TARGET_TICKS_DELTA_MS = 70;

        const boardCanvas = document.createElement("canvas");
        boardCanvas.height = BOARD_HEIGHT;
        boardCanvas.width = BOARD_WIDTH;
        windowField.appendChild(boardCanvas);

        resultGameOfLifeWindow.appendChild(windowField);

        const theGame = new ConwaysGameOfLife(boardCanvas, BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE, ALIVE_CELL_FILL_COLOR, TARGET_TICKS_DELTA_MS); // if you are reading this you've jost lost The Game

        // set game seed
        {
            // Penta-decathlon
            {
                const offsetX = 10;
                const offsetY = 35;

                theGame.board[offsetY + 1][offsetX + 5] = true;
                theGame.board[offsetY + 1][offsetX + 6] = true;
                theGame.board[offsetY + 1][offsetX + 7] = true;

                theGame.board[offsetY + 2][offsetX + 4] = true;
                theGame.board[offsetY + 2][offsetX + 8] = true;

                theGame.board[offsetY + 3][offsetX + 3] = true;
                theGame.board[offsetY + 3][offsetX + 9] = true;

                theGame.board[offsetY + 5][offsetX + 2] = true;
                theGame.board[offsetY + 5][offsetX + 10] = true;

                theGame.board[offsetY + 6][offsetX + 2] = true;
                theGame.board[offsetY + 6][offsetX + 10] = true;

                theGame.board[offsetY + 8][offsetX + 3] = true;
                theGame.board[offsetY + 8][offsetX + 9] = true;

                theGame.board[offsetY + 9][offsetX + 4] = true;
                theGame.board[offsetY + 9][offsetX + 8] = true;

                theGame.board[offsetY + 10][offsetX + 5] = true;
                theGame.board[offsetY + 10][offsetX + 6] = true;
                theGame.board[offsetY + 10][offsetX + 7] = true;
            }

            // Gosper glider gun
            {
                const offsetX = 10;
                const offsetY = 10;

                theGame.board[offsetY + 5][offsetX + 0] = true;
                theGame.board[offsetY + 5][offsetX + 1] = true;

                theGame.board[offsetY + 6][offsetX + 0] = true;
                theGame.board[offsetY + 6][offsetX + 1] = true;

                theGame.board[offsetY + 5][offsetX + 10] = true;
                theGame.board[offsetY + 6][offsetX + 10] = true;
                theGame.board[offsetY + 7][offsetX + 10] = true;

                theGame.board[offsetY + 4][offsetX + 11] = true;
                theGame.board[offsetY + 8][offsetX + 11] = true;

                theGame.board[offsetY + 3][offsetX + 12] = true;
                theGame.board[offsetY + 3][offsetX + 13] = true;

                theGame.board[offsetY + 9][offsetX + 12] = true;
                theGame.board[offsetY + 9][offsetX + 13] = true;

                theGame.board[offsetY + 6][offsetX + 14] = true;

                theGame.board[offsetY + 4][offsetX + 15] = true;
                theGame.board[offsetY + 8][offsetX + 15] = true;

                theGame.board[offsetY + 5][offsetX + 16] = true;
                theGame.board[offsetY + 6][offsetX + 16] = true;
                theGame.board[offsetY + 7][offsetX + 16] = true;

                theGame.board[offsetY + 6][offsetX + 17] = true;

                theGame.board[offsetY + 3][offsetX + 20] = true;
                theGame.board[offsetY + 4][offsetX + 20] = true;
                theGame.board[offsetY + 5][offsetX + 20] = true;

                theGame.board[offsetY + 3][offsetX + 21] = true;
                theGame.board[offsetY + 4][offsetX + 21] = true;
                theGame.board[offsetY + 5][offsetX + 21] = true;

                theGame.board[offsetY + 2][offsetX + 22] = true;
                theGame.board[offsetY + 6][offsetX + 22] = true;

                theGame.board[offsetY + 1][offsetX + 24] = true;
                theGame.board[offsetY + 2][offsetX + 24] = true;

                theGame.board[offsetY + 6][offsetX + 24] = true;
                theGame.board[offsetY + 7][offsetX + 24] = true;

                theGame.board[offsetY + 3][offsetX + 34] = true;
                theGame.board[offsetY + 4][offsetX + 34] = true;
                theGame.board[offsetY + 3][offsetX + 35] = true;
                theGame.board[offsetY + 4][offsetX + 35] = true;
            }
        }

        window.requestAnimationFrame(theGame.firstUpdate.bind(theGame));

        return resultGameOfLifeWindow;
    }
}