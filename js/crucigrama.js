"use strict";

class Crucigrama {
    board =
        "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";

    // board =
    // "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32";

    // board =
    // "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72";

    numCols = 9;
    numFilas = 11;
    init_time;
    end_time;
    boardRepresentation = [];
    selectedCell;
    constructor() {
        for (var i = 0; i < this.numFilas; i++) {
            this.boardRepresentation[i] = [];
            for (var j = 0; j < this.numCols; j++) {
                this.boardRepresentation[i][j] = 0;
            }
        }

        this.start();
        this.printMathWord();
    }

    printMathWord() {
        var main = $("<main>");
        this.init_time = new Date();
        for (var i = 0; i < this.numFilas; i++) {
            for (var j = 0; j < this.numCols; j++) {
                var p;
                if (this.boardRepresentation[i][j] == "0") {
                    p = $("<p>", {
                        text: "",
                        "data-row": i,
                        "data-pos": j,
                        "data-state": "noclicked",
                    });
                } else if (this.boardRepresentation[i][j] == "-1") {
                    p = $("<p>", {
                        text: "",
                        "data-row": i,
                        "data-pos": j,
                        "data-state": "empty",
                    });
                } else {
                    p = $("<p>", {
                        text: this.boardRepresentation[i][j],
                        "data-row": i,
                        "data-pos": j,
                        "data-state": "blocked",
                    });
                }
                main.append(p);
            }
        }
        $("body").append(main);

        this.addClickListeners();

    }


    addClickListeners(){

        var pNoClicked = $("p").filter(function() {
            return $(this).data("state") == "noclicked";
        }); 
        Array.from(pNoClicked).forEach((element) => {
            element.addEventListener("click", this.setClicked.bind(this, element));
        });
    }


    setClicked(p) {
        if(this.selectedCell != null) this.selectedCell.setAttribute("data-state","noclicked")
        this.selectedCell = p;
        this.selectedCell.setAttribute("data-state", "clicked");
    }


    start() {
        var characterList = this.board.split(",");
        var charCounter = 0;
        for (var i = 0; i < this.numFilas; i++) {
            for (var j = 0; j < this.numCols; j++) {
                if (characterList[charCounter] == ".") {
                    this.boardRepresentation[i][j] = "0";
                } else if (characterList[charCounter] == "#") {
                    this.boardRepresentation[i][j] = "-1";
                } else {
                    this.boardRepresentation[i][j] = characterList[charCounter];
                }
                charCounter++;
            }
        }
    }
}
