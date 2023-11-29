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
            zoom: 15 // starting zoom
        });
        var marker = new mapboxgl.Marker().setLngLat([this.longitud, this.latitud]).addTo(map);
    }

    readInputFile() {
        var archivo = $("input")[0].files[0];
        var lector = new FileReader();

        lector.onload = function (e) {
            var contenido = e.target.result;
            var seccionRutas = $("section:eq(2)");
            

            $(contenido).find("Ruta").each(function () {

                //INFO GENERAL
                var nombre = $(this).attr("nombre");
                var rating = $(this).attr("rating");
                var medioT = $(this).find("medio-transporte").text();
                var tipoRuta = $(this).attr("tipo-ruta");
                var fechaInicio = $(this).find("fecha-inicio").text();
                var horaInicio = $(this).find("hora-inicio").text();
                var agencia = $(this).find("agencia").text();
                var descripcion = $(this).find("descripcion").text();
                var accesibilidad= $(this).find("accesibilidad").text();
                var lugarInicio= $(this).find("lugar-inicio").text();
                var direccionInicio= $(this).find("direccion-inicio").text();
                var latitudInicio = $(this).find("coordenadas-inicio").find("latitud").text();
                var longitudInicio = $(this).find("coordenadas-inicio").find("longitud").text();
                var altitudInicio = $(this).find("coordenadas-inicio").find("altitud").text();
                
                console.log(nombre);
                console.log(rating);
                console.log(medioT);
                console.log(tipoRuta)
                console.log(fechaInicio)
                console.log(horaInicio)
                console.log(agencia)
                console.log(descripcion)
                console.log(accesibilidad)
                console.log(lugarInicio)
                console.log(direccionInicio)
                console.log(latitudInicio)
                console.log(longitudInicio)
                console.log(altitudInicio)

                //HITOS
                $(this).find("hito").each(function(){



                    
                });

                


            });
        };
        lector.readAsText(archivo);
    }
}
