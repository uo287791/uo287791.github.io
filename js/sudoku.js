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
    selectedPos;

    constructor() {
        document.addEventListener("keydown", (event) => this.keyEvent(event));
    }

    keyEvent(event) {
        if (this.selectedCell != null) {
            if(this.selectedCell.getAttribute("data-state") == data_state_values.CORRECT){
                alert("Esta celda ya está correcta!");
                return;
            }
            let currentValue = parseInt(event.key);

            if (currentValue >= 1 && event.key <= 9) {
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
        this.selectedCell.removeEventListener("click", this.clickHandler);
    }
    
    setSelectedCellInCorrect(){
        this.selectedCell.setAttribute("data-state",data_state_values.INCORRECT);
        alert("El numero introducido es erróneo, puede cambiarlo cuando quiera.");
    }

    checkRows(currentValue) {
        //Ningun numero igual en la misma fila
        for (let column = 0; column < this.board.length; column++) {
            if (column == this.selectedCellColumn) continue;

            if (this.board[this.selectedCellRow][column] == currentValue) {
                return false;
            }
        }
        return true;
    }

    checkColumns(currentValue) {
        //Misma columna
        for (let row = 0; row < this.board.length; row++) {
            if (row == this.selectedCellRow) continue;

            if (this.board[row][this.selectedCellColumn] == currentValue) {
                return false;
            }
        }
        return true;
    }

    checkBlock(currentValue) {
        //Mismo bloque de 9
        const size = 9; // Tamaño del tablero (en este caso, 9x9)
        const groupSize = 3; // Tamaño del grupo (en este caso, 3x3)
        const startRow =
            Math.floor(this.selectedPos / size / groupSize) * groupSize;
        const startColumn =
            Math.floor((this.selectedPos % size) / groupSize) * groupSize;

        for (let i = startRow; i < startRow + groupSize; i++) {
            for (let j = startColumn; j < startColumn + groupSize; j++) {
                if (i == this.selectedCellRow && j == this.selectedCellColumn)
                    continue;

                if (this.board[i][j] == currentValue) {
                    return false;
                }
            }
        }

        return true;
    }

    isValid(currentValue) {
        let rows = this.checkRows(currentValue);
        let columns = this.checkColumns(currentValue);
        let block = this.checkBlock(currentValue);
        return rows && columns && block;
    }

  
    checkIsCompleted() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] == 0) return false;
            }
        }
        return true;
    }

    introduceNumber(currentValue) {
        if (this.isValid(currentValue)) {
            this.checkIsCompleted();
            return true;
        }
        return false;
    }

    removeSelectedCell() {
        if (
            this.selectedCell.getAttribute("data-state") !=
            data_state_values.CORRECT
        ) {
            this.selectedCell.setAttribute(
                "data-state",
                data_state_values.INCORRECT
            );
        }
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
        const main = document.createElement("main");

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let p = document.createElement("p");
                main.appendChild(p);
            }
        }

        document.body.appendChild(main);
    }

    paintSudoku() {
        this.start();
        this.createStructure();
        const main = document.querySelector("main");
        const pElements = main.querySelectorAll("p");

        pElements.forEach((p, index) => {
            const listIndex = Math.floor(index / 9);
            const innerListIndex = index % 9;
            p.setAttribute("data-pos", index);
            p.setAttribute("data-row",this.sequencePosToArrayPosX(index));
            p.setAttribute("data-column",this.sequencePosToArrayPosY(index));

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

        let selectedPos = parseInt(this.selectedCell.getAttribute("data-pos"));
        this.selectedPos = selectedPos;
        this.selectedCellRow = this.sequencePosToArrayPosX(selectedPos);
        this.selectedCellColumn = this.sequencePosToArrayPosY(selectedPos);

        console.log(this.selectedCellRow);
        console.log(this.selectedCellColumn);
    }


    sequencePosToArrayPosX(pos){
        return Math.floor(pos / this.board.length)
    }


    sequencePosToArrayPosY(pos){
        return pos % this.board.length;
    }
}

const data_state_values = {
    BLOCKED: "blocked",
    NOCLICKED: "noclicked",
    CLICKED: "clicked",
    CORRECT: "correct",
    INCORRECT: "incorrect"
};
