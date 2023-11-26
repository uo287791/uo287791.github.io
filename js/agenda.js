"use strict";
class Agenda {
    constructor() {
        this.url = "http://ergast.com/api/f1/current";
        this.last_api_call = null;
        this.last_api_result = null;
        this.createButton();
    }

    createButton() {
        var self = this;

        var boton = $("<button>", {
            text: "Mostrar/Recargar agenda",
            click: function () {
                if (self.diferenciaFecha()) {
                    self.last_api_call = new Date();
                    self.getInfo();
                }
            },
        });

        $("body").append(boton);
    }

    diferenciaFecha() {
        if (this.last_api_call == null) {
            return true;
        }

        const diferenciaMillis = new Date() - this.last_api_call;
        const diferenciaEnMinutos = diferenciaMillis / (1000 * 60);
        return diferenciaEnMinutos >= 10;
    }

    getInfo() {
        $.ajax(
            //Parametros de ajax
            {
                url: this.url,
                method: "GET",
                dataType: "xml",
                success: function (data) {
                    this.last_api_result = data;

                    $(data)
                        .find("Race")
                        .each(function () {
                            var raceName = $(this).find("RaceName").text();
                            var circuitName = $(this)
                                .find("CircuitName")
                                .text();
                            var locality = $(this).find("Locality").text();
                            var country = $(this).find("Country").text();
                            var latitude = $(this).find("Location").attr("lat");
                            var longitude = $(this)
                                .find("Location")
                                .attr("long");
                            var date = $(this).find("Date").text().substring(0,10);
                            var time = $(this).find("Time").text().substring(0,9);

                            // Create a new section element
                            var section = $("<section>");

                            var pRaceName = $("<p>",{
                                text: `Nombre: ${raceName}`
                            });
                            var pCircuitName = $("<p>",{
                                text: `Circuito: ${circuitName}`
                            });
                            var pLocality = $("<p>",{
                                text: `Localidad: ${locality}`
                            });
                            var pCountry = $("<p>",{
                                text: `Pais: ${country}`
                            });
                            var pLatitude = $("<p>",{
                                text: `Latitud: ${latitude}`
                            });
                            var pLongitude = $("<p>",{
                                text: `Longitud: ${longitude}`
                            });

                            
                            var pDate = $("<p>",{
                                text: `Fecha: ${date}`
                            });
                            var pTime = $("<p>",{
                                text: `Hora: ${time}`
                            });

                            section.append(
                                pRaceName,
                                pCircuitName,
                                pLocality,
                                pCountry,
                                pLatitude,
                                pLongitude,
                                pDate,
                                pTime
                            );
                            $("main").append(section);

                        });

                    
                },
            }
        );
    }
}
