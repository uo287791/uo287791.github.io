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
        this.showMap();

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

    showMap() {
        var url = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/pin-l+555555(${this.longitud},${this.latitud})/${this.longitud},${this.latitud},13.95,0/300x200?access_token=pk.eyJ1IjoidW8yODc3OTEiLCJhIjoiY2xwaXNhbG41MDJlcjJpbzdsZm8wbmxmeSJ9.LoxN1FTXvjz2AqkFctRVew`;
    
        var staticMap = $("<img>",{
            src: url
        })
        $("main section h2").after(staticMap);
        console.log(url);
    }
}
