"use strict";
class Sudoku {
    gameStrings = [
        "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6",
        "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7",
        "8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984",
    ];
    rowNumber = 9;
    columnNumber = 9;
    board = [
        ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ];
    selectedCell;
    selectedCellRow;
    selectedCellColumn;
    clickHandler;

    constructor() {
        document.addEventListener("keydown", (event) => this.keyEvent(event));
    }

    keyEvent(event) {
        if (this.selectedCell != null) {
            let currentValue = parseInt(event.key);

            if (currentValue >= 1 && event.key <= 9) {
                this.selectedCell.style.color = "grey";
                this.selectedCell.textContent = currentValue;
            }

            this.board[this.selectedCellRow][this.selectedCellColumn] =
                event.key;

            this.introduceNumber(currentValue)
                ? this.setSelectedCellCorrect()
                : this.setSelectedCellInCorrect();

            this.removeSelectedCell();
        } else {
            alert("Ha de seleccionar una celda antes de introducir un número.");
        }
    }

    setSelectedCellCorrect() {
        this.selectedCell.setAttribute("data-state", data_state_values.CORRECT);
        this.selectedCell.style.color = "green";
        this.selectedCell.removeEventListener("click", this.clickHandler);
    }

    isValid(currentValue) {
        //Ningun numero igual en la misma fila
        for (let column = 0; column < this.board.length; column++) {
            if (column == this.selectedCellColumn) continue;

            if (this.board[this.selectedCellRow][column] == currentValue) {
                return false;
            }
        }
        //Misma columna
        for (let row = 0; row < this.board.length; row++) {
            if (row == this.selectedCellRow) continue;

            if (this.board[row][this.selectedCellColumn] == currentValue) {
                return false;
            }
        }
        //Mismo bloque de 9
        const size = 9; // Tamaño del tablero (en este caso, 9x9)
        const groupSize = 3; // Tamaño del grupo (en este caso, 3x3)
        const filaInicio = Math.floor(indice / size / groupSize) * groupSize;
        const columnaInicio = Math.floor((indice % size) / groupSize) * groupSize;


        //en otro caso, retornar true
        return true;
    }

    setSelectedCellInCorrect() {
        this.selectedCell.style.color = "red";
    }
    checkIsCompleted() {
        //checkear el array, si esta todo diferente de cero, completado
    }

    introduceNumber(currentValue) {
        if (this.isValid(currentValue)) {
            this.checkIsCompleted();
            return true;
        }
        return false;
    }

    removeSelectedCell() {
        this.selectedCell.setAttribute(
            "data-state",
            data_state_values.NOCLICKED
        );

        this.selectedCell = null;
    }

    start() {
        let characterCounter = 0;
        let randomGameString =
            this.gameStrings[
                Math.floor(Math.random() * this.gameStrings.length)
            ];
        console.log(randomGameString[0]);

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                let currentCharacter = randomGameString[characterCounter];
                console.log(currentCharacter);
                if (currentCharacter == ".") {
                    this.board[i][j] = "0";
                } else {
                    this.board[i][j] = currentCharacter;
                }
                characterCounter++;
            }
        }
    }

    createStructure() {
        const rows = this.board.length;
        const columns = this.board[0].length;
        const section = document.createElement("section");
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let p = document.createElement("p");
                section.appendChild(p);
            }
        }

        let main = document.querySelector("main");
        main.appendChild(section);
    }

    paintSudoku() {
        this.start();
        this.createStructure();
        const section = document.querySelector("section");
        const pElements = section.querySelectorAll("p");

        pElements.forEach((p, index) => {
            const listIndex = Math.floor(index / 9);
            const innerListIndex = index % 9;
            p.setAttribute("pos", index);
            if (this.board[listIndex][innerListIndex] != "0") {
                p.textContent = this.board[listIndex][innerListIndex];
                p.setAttribute("data-state", data_state_values.BLOCKED);
            } else {
                this.clickHandler = this.setClicked.bind(this, p);
                p.addEventListener("click", this.clickHandler);
                p.setAttribute("data-state", data_state_values.NOCLICKED);
            }
        });
    }

    setClicked(p) {
        this.selectedCell = p;
        this.selectedCell.setAttribute("data-state", data_state_values.CLICKED);

        let seletedPos = parseInt(this.selectedCell.getAttribute("pos"));
        this.selected
        this.selectedCellRow = Math.floor(seletedPos / this.board.length);
        this.selectedCellColumn = seletedPos % this.board.length;

        console.log(this.selectedCellRow);
        console.log(this.selectedCellColumn);
    }
}

const data_state_values = {
    BLOCKED: "blocked",
    NOCLICKED: "noclicked",
    CLICKED: "clicked",
    CORRECT: "correct",
};
