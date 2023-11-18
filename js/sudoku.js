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

	

    constructor() {
        
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
			
            if (this.board[listIndex][innerListIndex] != "0") {
                p.textContent = this.board[listIndex][innerListIndex];
				p.setAttribute("data-state",data_state_values.BLOCKED);
            }else{
				p.addEventListener("click",this.setClicked.bind(this,p));
				p.setAttribute("data-state",data_state_values.NOCLICKED);
			}
        });
    }

	setClicked(p){
		p.setAttribute("data-state",data_state_values.CLICKED);
	}
}

const data_state_values = {
	BLOCKED: "blocked",
	NOCLICKED: "noclicked",
	CLICKED: "clicked",
  };