"use strict";
class Pais {

    nombre;
    capital;
    poblacion;
    formaDeGobierno;
    coordenadasCapital;
    religion;

    constructor(nombre, capital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
    }



    rellenarAtributosRestantes(formaDeGobierno, coordenadasCapital, religion) {
        this.formaDeGobierno = formaDeGobierno;
        this.coordenadasCapital = coordenadasCapital;
        this.religion = religion;
    }

    obtenerNombreComoTexto() {
        return `${this.nombre}`;
    }

    obtenerCapitalComoTexto() {
        return `Capital: ${this.capital}`;
    }


    obtenerInformacionSecundariaComoHTML() {
        const listaHTML = `<ul>
                            <li>Población: ${this.poblacion}</li>
                            <li>Forma de Gobierno: ${this.formaDeGobierno}</li>
                            <li>Religión Mayoritaria: ${this.religion}</li>
                          </ul>`;
        return listaHTML;
    }


    obtenerCoordenadasComoHTML(){
        document.write("<p>10.48801, -66.87919</p>");

    }

}