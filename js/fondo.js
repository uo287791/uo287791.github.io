"use strict";
class Fondo {
    constructor(nombrePais, nombreCapital, lat, long) {
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.lat = lat;
        this.long = long;
        this.getFlickrImage();
    }

     getFlickrImage() {
        var flickrAPI =
            "https://www.flickr.com/services/rest/?method=flickr.photos.search";
        var apiKey = "5175c94fa8bb8fdf47781de0e48d1abc";
        var tags = "Caracas";
        
        $.getJSON(flickrAPI, {
            api_key: apiKey,
            lat: this.lat,
            lon: this.long,
            radius: "30",
            tags: tags,
            format: "json",
            
            nojsoncallback: 1 
        }).done(function (data) {

            var photos = data.photos.photo;
            var firstPhoto = photos[Math.floor(Math.random() * photos.length)];    
            var id = firstPhoto.id;
            var secret = firstPhoto.secret;
            var server = firstPhoto.server;
            var imgUrl = "https://farm" + firstPhoto.farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_b.jpg";
    
            $("body").css({
                "background-image": "url(" + imgUrl + ")",
                "background-size": "cover",
            });
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error al obtener datos de Flickr:", textStatus, errorThrown);
        });
    }
    
    
}
