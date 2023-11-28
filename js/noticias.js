"use strict";

class Noticias {
    constructor() {
        if (
            window.File &&
            window.FileReader &&
            window.FileList &&
            window.Blob
        ) {
        } else
            document.write(
                "<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>"
            );
    }

    readInputFile() {
        var archivo = $("input:last")[0].files[0];
        var lector = new FileReader();

        lector.onload = function (e) {
            var contenido = e.target.result;
            var main = $("<main>");

            var noticias = contenido.split("\n");
            

            $.each(noticias, function (index, noticia) {
                var htmlSectionNoticia = $("<section>");
                var seccionesNoticia = noticia.split("_");
                
                var titular = $("<h2>",{
                    text: seccionesNoticia[0]
                });

                htmlSectionNoticia.append(titular);

                for (var i = 1; i < seccionesNoticia.length; i++) {
                    var parrafo = $("<p>").text(seccionesNoticia[i]);
                    htmlSectionNoticia.append(parrafo);
                }
                main.append(htmlSectionNoticia);
            });


            $("body").append(main);
        };
        lector.readAsText(archivo);
    }

    añadirNoticia(){

        var titular = $("input:eq(0)").val();
        var entradilla = $("input:eq(1)").val();
        var texto = $("textarea").val();
        var autor = $("input:eq(2)").val();

        var htmlSectionNoticia = $("<section>");
        titular = $("<h2>",{
            text: titular
        });
        entradilla = $("<p>",{
            text: entradilla
        });
        texto = $("<p>",{
            text: texto
        });
        autor = $("<p>",{
            text: autor
        });

        htmlSectionNoticia.append(titular,entradilla,texto,autor)
        var main = $("main")
        
        main.append(htmlSectionNoticia);
        

    }
}
