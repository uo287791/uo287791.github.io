"use strict";

class Crucigrama {
    board =
        "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";

    // board =
    // "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32";

    // board =
    //     "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72";

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
                        "data-column": j,
                        "data-state": "noclicked",
                    });
                } else if (this.boardRepresentation[i][j] == "-1") {
                    p = $("<p>", {
                        text: "",
                        "data-row": i,
                        "data-column": j,
                        "data-state": "empty",
                    });
                } else {
                    p = $("<p>", {
                        text: this.boardRepresentation[i][j],
                        "data-row": i,
                        "data-column": j,
                        "data-state": "blocked",
                    });
                }
                main.append(p);
            }
        }
        $("body").append(main);
        this.addListeners();
    }

    addListeners() {
        document.addEventListener("keydown", (event) => this.keyEvent(event));
        this.addClickListeners();
    }

    keyEvent(event) {
        if (this.selectedCell != null) {
            var operadoresMatematicos = ["+", "-", "*", "/"];

            if (
                event.key <= 9 ||
                event.key >= 1 ||
               operadoresMatematicos.includes(event.key)
            ) { 
                this.selectedCell.textContent = event.key;
                this.boardRepresentation[
                    this.selectedCell.getAttribute("data-row")
                ][this.selectedCell.getAttribute("data-column")] = event.key;
                this.introduceElement(event.key);
                
                this.removeSelectedCell();
            }
        } else {
            alert("Ha de seleccionar una celda antes de introducir un número.");
        }
    }

    removeSelectedCell() {
        this.selectedCell = null;
    }

    introduceElement(char) {
        if (this.isValid(char)) {
            this.selectedCell.textContent = char;
            this.boardRepresentation[
                this.selectedCell.getAttribute("data-row")
            ][this.selectedCell.getAttribute("data-column")] = char;
            this.selectedCell.setAttribute("data-state", "correct");
        } else {
            this.selectedCell.textContent = "";
            this.boardRepresentation[
                this.selectedCell.getAttribute("data-row")
            ][this.selectedCell.getAttribute("data-column")] = "0";
            this.selectedCell.setAttribute("data-state", "noclicked");
            alert("Valor introducido incorrecto para la casilla seleccionada");
        }

        if (this.checkWinCondition()) {
            this.end_time = new Date();
            var tiempo = this.diferenciaFecha();
            alert(`Tiempo: ${tiempo.horas}:${tiempo.minutos}:${tiempo.segundos}`);
        }
    }

    diferenciaFecha() {
        const diferencia = this.end_time - this.init_time;

        // Calcular las horas, minutos y segundos
        const segundosTotales = Math.floor(diferencia / 1000);
        const horas = Math.floor(segundosTotales / 3600);
        const minutos = Math.floor((segundosTotales % 3600) / 60);
        const segundos = segundosTotales % 60;
    
        return {
            horas: horas,
            minutos: minutos,
            segundos: segundos
        };
    }

    checkWinCondition() {
        for (let i = 0; i < this.boardRepresentation.length; i++) {
            for (let j = 0; j < this.boardRepresentation[i].length; j++) {
                if(this.boardRepresentation[i][j] == "0"){
                    return false;
                }
            }
            
        }
        return true;
    }

    

    isValid() {
        var expression_row = true;
        var expression_column = true;
        var column = this.selectedCell.getAttribute("data-column");
        var row = this.selectedCell.getAttribute("data-row");
        //HORIZONTAL
        if (Number(column) + 1 < this.numCols) {
            //SI NO ES LA ULTIMA FILA COMPRUEBO...

            if (this.boardRepresentation[row][Number(column) + 1] != -1) {
                //SI A LA DERECHA TIENE ALGO...
                var posDerecha = "";
                var contadorDesplazamiento = 0;
                while (posDerecha != "=") {
                    posDerecha =
                        this.boardRepresentation[row][
                            Number(column) + 1 + contadorDesplazamiento
                        ];
                    contadorDesplazamiento++;
                }

                var first_number =
                    this.boardRepresentation[row][
                        Number(column) + contadorDesplazamiento - 3
                    ];


                var second_number =
                    this.boardRepresentation[row][
                        Number(column) + contadorDesplazamiento - 1
                    ];
                var expression =
                    this.boardRepresentation[row][
                        Number(column) + contadorDesplazamiento - 2
                    ];
                var result =
                    this.boardRepresentation[row][
                        Number(column) + contadorDesplazamiento + 1
                    ];

                if (
                    first_number != 0 &&
                    second_number != 0 &&
                    result &&
                    expression != 0
                ) {
                    var computedResult = eval(
                        first_number + expression + second_number
                    );
                    console.log(computedResult);
                    if (computedResult != result) {
                        expression_row = false;
                    }
                } 
            }
        }
        //VERTICAL
        if (Number(row) + 1 < this.numFilas) {
            //SI NO ES LA ULTIMA FILA COMPRUEBO...

            if (this.boardRepresentation[Number(row) + 1][column] != -1) {
                //SI ABAJO TIENE ALGO...
                var posAbajo = "";
                var contadorDesplazamiento = 0;
                while (posAbajo != "=") {
                    posAbajo =
                        this.boardRepresentation[
                            Number(row) + 1 + contadorDesplazamiento
                        ][column];
                    contadorDesplazamiento++;
                }

                var first_number =
                    this.boardRepresentation[
                        Number(row) + contadorDesplazamiento - 3
                    ][column];

                var second_number =
                    this.boardRepresentation[
                        Number(row) + contadorDesplazamiento - 1
                    ][column];
                var expression =
                    this.boardRepresentation[
                        Number(row) + contadorDesplazamiento - 2
                    ][column];
                var result =
                    this.boardRepresentation[
                        Number(row) + contadorDesplazamiento + 1
                    ][column];

                if (
                    first_number != 0 &&
                    second_number != 0 &&
                    result &&
                    expression != 0
                ) {
                    var computedResult = eval(
                        first_number + expression + second_number
                    );
                    console.log(computedResult);
                    if (computedResult != result) {
                        expression_column = false;
                    }
                    console.log("computed RESULT" + computedResult);
                } 
            }
        }

        return expression_column && expression_row;
    }

 
    addClickListeners() {
        var pNoClicked = $("p").filter(function () {
            return $(this).data("state") == "noclicked";
        });
        Array.from(pNoClicked).forEach((element) => {
            element.addEventListener(
                "click",
                this.setClicked.bind(this, element)
            );
        });
    }

    setClicked(p) {
        if (this.selectedCell != null)
            this.selectedCell.setAttribute("data-state", "noclicked");
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
