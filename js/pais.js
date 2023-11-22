"use strict";
class Pais {

    key = "c671d920e7a1bac668637655ee975964";


    constructor(nombre, capital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
      
    }



    rellenarAtributosRestantes(formaDeGobierno, religion,lat,long) {
        this.formaDeGobierno = formaDeGobierno;
        this.religion = religion;
        this.lat = lat;
        this.long = long;
        console.log(`api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${this.key}`)
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
                            <li>Coordenadas: ${this.lat} , ${this.long}</li>
                          </ul>`;
        return listaHTML;
    }


    obtenerCoordenadasComoHTML(){
        document.write(`<p>${this.lat}, ${this.long}</p>`);
    }

    getMeteo(){
        $.ajax(
            {

                url:`https://api.openweathermap.org/data/3.0/onecall?lat=${this.lat}&lon=${this.long}&
                units=metric&exclude=hourly&appid=${this.key}`,
                method: "GET",
                dataType: "json",
                success: function(data){

                },
                error: function(status){
                    console.log(status);
                }
        });
    }

}