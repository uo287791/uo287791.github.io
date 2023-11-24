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

    printMathWord(){


        
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
