import xml.etree.ElementTree as ET


def generateKML(xmlFile):
    tree = ET.parse(xmlFile)
    root = tree.getroot()
    iter = 0
    for child in root:
        iter += 1
        nombre_archivo = f"planimetria{iter}.kml"
        currentFile = open(nombre_archivo,"w")
        currentFile.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        currentFile.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
        currentFile.write('<Document>\n')

        currentFile.write('<Placemark>\n')
        currentFile.write('<LineString>\n')
        currentFile.write("<extrude>1</extrude>\n")

        currentFile.write('<tessellate>1</tessellate>\n')

        currentFile.write('<coordinates>\n')

        for child2 in child:

            if(child2.tag == "{http://www.uniovi.es}hito"):            
                for child3 in child2:
                    if(child3.tag == "{http://www.uniovi.es}coordenadas-hito"):
                        comma = 0
                        for child4 in child3:
                            if(child4.tag != "{http://www.uniovi.es}altitud"):
                                currentFile.write(child4.text)
                                if(comma != 1):
                                    currentFile.write(",")
                                comma +=1
                        
                        currentFile.write("\n")


        
        currentFile.write('\n</coordinates>\n')
        currentFile.write('<altitudeMode>relativeToGround</altitudeMode>\n')
        currentFile.write('</LineString>\n')
        currentFile.write('<Style id="redLine">\n')
        currentFile.write('<LineStyle>\n')

        currentFile.write('<color>#ff0000ff</color>\n')
        currentFile.write('<width>5</width>\n')
        currentFile.write('</LineStyle>\n')
        currentFile.write('</Style>\n')


     
        currentFile.write('</Placemark>\n')
        currentFile.write('</Document>\n')
        currentFile.write('</kml>\n')



file = input("Nombre del archivo:")
generateKML(file)
