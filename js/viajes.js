"use strict";
class Viajes {
    constructor() {
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
        this.showStaticMap();
        this.showDynamicMap();
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

    getLongitud() {
        return this.longitud;
    }
    getLatitud() {
        return this.latitud;
    }

    showStaticMap() {
        var url = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/pin-l+555555(${this.longitud},${this.latitud})/${this.longitud},${this.latitud},13.95,0/300x200?access_token=pk.eyJ1IjoidW8yODc3OTEiLCJhIjoiY2xwaXNhbG41MDJlcjJpbzdsZm8wbmxmeSJ9.LoxN1FTXvjz2AqkFctRVew`;

        var staticMap = $("<img>", {
            src: url,
        });
        $("main section:eq(0)").append(staticMap);
        console.log(url);
    }

    showDynamicMap() {
        mapboxgl.accessToken =
            "pk.eyJ1IjoidW8yODc3OTEiLCJhIjoiY2xwaXNhbG41MDJlcjJpbzdsZm8wbmxmeSJ9.LoxN1FTXvjz2AqkFctRVew";

        const map = new mapboxgl.Map({
            container: "section",
            style: "mapbox://styles/mapbox/streets-v12",
            center: [this.longitud, this.latitud], // starting position [lng, lat]
            zoom: 15, // starting zoom
        });
        var marker = new mapboxgl.Marker()
            .setLngLat([this.longitud, this.latitud])
            .addTo(map);
    }

    readInputFile() {
        var archivo = $("input")[0].files[0];
        var lector = new FileReader();

        lector.onload = function (e) {
            var contenido = e.target.result;
            var seccionRutas = $("section:eq(3)");

            $(contenido)
                .find("Ruta")
                .each(function () {
                    var seccionRuta = $("<section>");

                    //INFO GENERAL
                    var nombre = $(this).attr("nombre");
                    var rating = $(this).attr("rating");
                    var medioT = $(this).find("medio-transporte").text();
                    var tipoRuta = $(this).attr("tipo-ruta");
                    var fechaInicio = $(this).find("fecha-inicio").text();
                    var horaInicio = $(this).find("hora-inicio").text();
                    var agencia = $(this).find("agencia").text();
                    var descripcion = $(this).find("descripcion").text();
                    var accesibilidad = $(this).find("accesibilidad").text();
                    var lugarInicio = $(this).find("lugar-inicio").text();
                    var direccionInicio = $(this)
                        .find("direccion-inicio")
                        .text();
                    var latitudInicio = $(this)
                        .find("coordenadas-inicio")
                        .find("latitud")
                        .text();
                    var longitudInicio = $(this)
                        .find("coordenadas-inicio")
                        .find("longitud")
                        .text();
                    var altitudInicio = $(this)
                        .find("coordenadas-inicio")
                        .find("altitud")
                        .text();

                    var pNombre = $("<h3>", { text: nombre });
                    var pRating = $("<p>", { text: "Rating: " + rating });
                    var pMedioT = $("<p>", {
                        text: "Medio de transporte: " + medioT,
                    });
                    var pTipoRuta = $("<p>", { text: "Tipo: " + tipoRuta });
                    var pFechaInicio = $("<p>", {
                        text: "Fecha de inicio: " + fechaInicio,
                    });
                    var pHoraInicio = $("<p>", {
                        text: "Hora inicio: " + horaInicio,
                    });
                    var pAgencia = $("<p>", { text: "Agencia: " + agencia });
                    var pDescripcion = $("<p>", {
                        text: "Descripcion: " + descripcion,
                    });
                    var pAccesibilidad = $("<p>", {
                        text: "Accesibilidad: " + accesibilidad,
                    });
                    var pLugarInicio = $("<p>", {
                        text: "Lugar de inicio: " + lugarInicio,
                    });
                    var pDireccionInicio = $("<p>", {
                        text: "Direccion de inicio: " + direccionInicio,
                    });
                    var headerCoordenadas = $("<h4>", {
                        text: "Coordenadas inicio",
                    });
                    var pLatitudInicio = $("<p>", {
                        text: "Latitud: " + latitudInicio,
                    });
                    var pLongitudInicio = $("<p>", {
                        text: "Longitud: " + longitudInicio,
                    });
                    var pAltitudInicio = $("<p>", {
                        text: "Altitud: " + altitudInicio,
                    });

                    var headerHitos = $("<h4>", { text: "Hitos" });


                    seccionRuta.append(
                        pNombre,
                        pRating,
                        pMedioT,
                        pTipoRuta,
                        pFechaInicio,
                        pHoraInicio,
                        pAgencia,
                        pDescripcion,
                        pAccesibilidad,
                        pLugarInicio,
                        pDireccionInicio,
                        headerCoordenadas,
                        pLatitudInicio,
                        pLongitudInicio,
                        pAltitudInicio,
                        headerHitos
                    );

                    //HITOS
                    $(this)
                        .find("hito")
                        .each(function () {
                            var nombreHito = $(this).attr("nombre");
                            var descripcionHito = $(this)
                                .find("descripcion-hito")
                                .text();
                            var longitudHito = $(this)
                                .find("coordenadas-hito")
                                .find("longitud")
                                .text();
                            var latitudHito = $(this)
                                .find("coordenadas-hito")
                                .find("latitud")
                                .text();
                            var altitudHito = $(this)
                                .find("coordenadas-hito")
                                .find("altitud")
                                .text();

                            var headerHito = $("<h5>", {
                                text: nombreHito,
                            });
                            var pDescripcionHito = $("<p>", {
                                text: "Descripcion: " + descripcionHito,
                            });

                            var headerCoordenadasHito = $("<h6>", {
                                text: "Coordenadas"
                            });

                            var pLongitudHito = $("<p>", {
                                text: "Longitud: " + longitudInicio,
                            });
                            var pLatitudHito = $("<p>", {
                                text: "Latitud: " + longitudInicio,
                            });
                            var pAltitudHito = $("<p>", {
                                text: "Altitud: " + longitudInicio,
                            });

                            seccionRuta.append(
                                headerHito,
                                pDescripcionHito,
                                headerCoordenadasHito,
                                pLongitudHito,
                                pLatitudHito,
                                pAltitudHito);
                        });

                    seccionRutas.append(seccionRuta);
                });
        };
        lector.readAsText(archivo);
    }
}
