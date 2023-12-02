"use strict";
class ComoLlegar {
    KMLProcesado = false;
    constructor() {
        this.accessToken =
            "pk.eyJ1IjoidW8yODc3OTEiLCJhIjoiY2xwaXNhbG41MDJlcjJpbzdsZm8wbmxmeSJ9.LoxN1FTXvjz2AqkFctRVew";
        this.coordenadas = [];
        navigator.geolocation.getCurrentPosition(
            this.getPosicion.bind(this),
            this.verErrores.bind(this)
        );
    }

    getPosicion(posicion) {
        this.mensaje =
            "Se ha realizado correctamente la petición de geolocalización";
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
    }

    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje =
                    "El usuario no permite la petición de geolocalización";
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible";
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado";
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido";
                break;
        }
    }

    procesarKML(archivo) {
        this.KMLProcesado = true;
        var self = this;
        var archivo = $("input")[0].files[0];
        var lector = new FileReader();

        lector.onload = function (e) {
            var contenido = e.target.result;
            var coordenadasObtenidas = $(contenido).find("coordinates").text();
            self.coordenadas.push(coordenadasObtenidas.trim().split(","));
        };
        lector.readAsText(archivo);

        var boton = $("main button");
        var imgFlecha = $("<img>",{
            src: "./Multimedia/Fotos/flechaRoja.png",
            alt:"Flecha roja"
        })

        boton.after(imgFlecha)
    }

    showDirecciones() {
        if (this.KMLProcesado != true) {
            alert("Tienes que elegir un destino!");
            return;
        }

        ////////SINTENTIZADOR DE VOZ/////
        var synth = window.speechSynthesis;

        //////////////////////GENERACION DEL MAPA////////////////
        mapboxgl.accessToken =
            "pk.eyJ1IjoidW8yODc3OTEiLCJhIjoiY2xwaXNhbG41MDJlcjJpbzdsZm8wbmxmeSJ9.LoxN1FTXvjz2AqkFctRVew";

        const map = new mapboxgl.Map({
            container: "comollegar",
            style: "mapbox://styles/mapbox/streets-v12",
            center: [this.longitud, this.latitud], // starting position [lng, lat]
            zoom: 15, // starting zoom
        });

        //MARKER CON MI POSICION
        var marker = new mapboxgl.Marker()
            .setLngLat([this.longitud, this.latitud])
            .addTo(map);
        //PONER MARKER EN COORDENADAS
        var marker2 = new mapboxgl.Marker()
            .setLngLat([
                parseFloat(this.coordenadas[0][1]),
                parseFloat(this.coordenadas[0][0]),
            ])
            .addTo(map);
        ///////////////////////////////////////////////////////

        var listaInstrucciones = $("ol");

        $.ajax({
            //inicio     inicio     fin          fin
            url: `https://api.mapbox.com/directions/v5/mapbox/walking/${
                this.longitud
            }%2C${this.latitud}%3B${parseFloat(
                this.coordenadas[0][1]
            )}%2C${parseFloat(
                this.coordenadas[0][0]
            )}?alternatives=true&continue_straight=true&geometries=geojson&language=es&overview=full&steps=true&access_token=pk.eyJ1IjoidW8yODc3OTEiLCJhIjoiY2xwaXNhbG41MDJlcjJpbzdsZm8wbmxmeSJ9.LoxN1FTXvjz2AqkFctRVew`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                //CADA PASO DE LA RUTA
                var steps = data.routes["0"].legs["0"].steps;
                var stepCounter = 0;
                var currentStep = steps[stepCounter];

                while (currentStep.maneuver.type != "arrive") {
                    //ESPERAR DOS SEGUNDOS
                    // setTimeout(function () {
                        //Texto de instruccion
                        var textoInstruccion = currentStep.maneuver.instruction;

                        //Adición parrafo instruccion a HTML
                        var pInst = $("<li>", {
                            text: textoInstruccion,
                        });
                        listaInstrucciones.append(pInst);

                        /////AUDIO INSTRUCCION/////
                        var mensaje = new SpeechSynthesisUtterance(
                            textoInstruccion
                        );
                        synth.speak(mensaje);
                        /////////////////////////

                        //Pasar inst siguiente
                        stepCounter++;
                        currentStep = steps[stepCounter];
                    // }, 3000);
                }
            },
            error: function (status) {},
        });
    }
}
