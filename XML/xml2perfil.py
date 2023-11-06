import xml.etree.ElementTree as ET

# Parsear el archivo XML
tree = ET.parse('rutasEsquema.xml')  # Asegúrate de reemplazar 'ruta.xml' con la ruta real de tu archivo XML
root = tree.getroot()

rutas = root.findall("./{http://www.uniovi.es}ruta")

for i in range(len(rutas)):

    currentRuta = rutas[i]
    initX = 0
    initY = 0
    # Obtener todos los hitos
    hitos = currentRuta.findall(".//{http://www.uniovi.es}hito")

    # Obtener las altitudes de cada hito
    altitudes = [hito.find('{http://www.uniovi.es}coordenadas-hito/{http://www.uniovi.es}altitud').text.strip() for hito in hitos]

    # Crear un archivo SVG para la polilínea
    with open(f'altitudes{i}.svg', 'w') as svg_file:
        svg_file.write('<svg height="30" width="100" xmlns="http://www.w3.org/2000/svg">')
        altInicial = altitudes[0]
        # Calcular los puntos para la polilínea en base a las altitudes
        points = ""
        for i, altitud in enumerate(altitudes, start = 1):
            
            x = i * 10
            
            y = int(altitud)/int(altInicial) * 15# Escalamos la altitud para que sea visible en la representación SVG
            points += f" {x},{y} "
   
        # Dibujar la polilínea con los puntos calculados
        svg_file.write(f'\n<polyline points="{points}" fill="none" stroke="black"  />')
        svg_file.write('\n</svg>')
