"use strict";
class Pais {
    key = "c671d920e7a1bac668637655ee975964";

    constructor(nombre, capital, poblacion, lat, long) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
        this.lat = lat;
        this.long = long;
        this.getMeteo();
    }

    rellenarAtributosRestantes(formaDeGobierno, religion) {
        this.formaDeGobierno = formaDeGobierno;
        this.religion = religion;
        this.lat = lat;
        this.long = long;
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

    obtenerCoordenadasComoHTML() {
        document.write(`<p>${this.lat}, ${this.long}</p>`);
    }

    getMeteo() {
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&units=metric&lon=${this.long}&appid=${this.key}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                //fecha primer pronostico
                var ultimaFecha = new Date(0);
                //parametros a representar
                var temperaturaMax;
                var temperaturaMin;
                var humedad;
                var icono;
                var lluvia = 0;
                $.each(data.list, function (i, val) {
                    //Fecha pronostico
                    var fecha = new Date(val.dt_txt.split(" ")[0]);
                    //si la fecha no coincide, pinto el pronostico de ultimaFecha
                    if (
                        ultimaFecha.getDay() != fecha.getDay() &&
                        ultimaFecha.getFullYear() != "1970" //año de Date(0), usado como fecha inicial
                    ) {
                        var meteoSection = $("section:eq(1)");
                        var daySection = $("<section>");
                        
                        var imagen = $("<img>").attr({
                            src: "https://openweathermap.org/img/wn/" + icono +"@2x.png",
                            alt: "Descripción de la imagen" // Puedes agregar más atributos si es necesario
                        });

                        var pFecha = $("<p>", {
                            text: "Fecha: " + ultimaFecha.getDate() + "/" + eval(ultimaFecha.getMonth()+1) + "/" + ultimaFecha.getFullYear()
                        });


                        var pTempMax = $("<p>", {
                                        text: "Temperatura máxima: " + temperaturaMax
                                    });
                        var pTempMin =  $("<p>", {
                            text: "Temperatura mínima: " + temperaturaMin
                        });

                        var pHumedad =  $("<p>", {
                            text: "Humedad: " + humedad + "%"
                        });
                        var pLluvia =  $("<p>", {
                            text: "Lluvia: " + lluvia + " mm"
                        });

                        daySection.append(imagen);
                        daySection.append(pFecha);
                        daySection.append(pTempMax);
                        daySection.append(pTempMin);
                        daySection.append(pHumedad);
                        daySection.append(pLluvia);

                        meteoSection.append(daySection);

                    }

                    //si la fecha coincide, sigo mirando los parametros necesarios para pintarla
                    if (ultimaFecha.getDay() == fecha.getDay()) {
                        if (temperaturaMax < val.main.temp_max) {
                            temperaturaMax = val.main.temp_max;
                        }

                        if (temperaturaMin > val.main.temp_min) {
                            temperaturaMin = val.main.temp_min;
                        }

                        if("rain" in val){
                            lluvia += val.rain["3h"];
                        }
                       
                    }

                    //si la fecha no coincide, empiezo de nuevo con los parametros para pintar esta nueva
                    if (ultimaFecha.getDay() != fecha.getDay()) {
                        temperaturaMax = val.main.temp_max;
                        temperaturaMin = val.main.temp_min;
                        humedad = val.main.humidity;
                        icono = val.weather["0"].icon;
                        if ("rain" in val){
                            lluvia = val.rain["3h"];
                        }
                    }

                    ultimaFecha = new Date(val.dt_txt.split(" ")[0]);
                });

            },
            error: function (status) {
                 
            },
        });
    }
}
