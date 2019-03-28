import base64

from kgml2Json import SimpleKGML
from graphviz import Digraph

# Global variables
horizontal_graph = False # Generate horizontal image

def generate_graph(fileName, dict):
    g = Digraph('G', format='png')
    if(horizontal_graph):
        g.attr(rankdir='LR')
    for k in dict.keys():
        g.node(k)
        for v in dict[k]:
            g.edge(k, v)
    g.render("images/" + fileName)

    # The following is used to include in the HTML, check later if it's necessary
    #with open("g.png", "rb") as image_file:
    #    encoded_string = base64.b64encode(image_file.read())
    #return encoded_string

# Algorithm 1
def metabolic_pathways_HTML_alg1(xmlPath1, xmlPath2, pathway0, pathway1):
    # Gets file name for graph image.
    fileName1 = xmlPath1[len(xmlPath1) - int(xmlPath1[::-1].find('/')): -4]
    fileName2 = xmlPath2[len(xmlPath2) - int(xmlPath2[::-1].find('/')): -4]

    g1 = generate_graph(fileName1, pathway0)
    g2 = generate_graph(fileName2, pathway1)

if __name__ == '__main__':
    # ELIMINAR VARIABLE 'ARGUMENTS', NO ES NECESARIA CON LA CONEXIÓN.
    # Change with the way it needs to be done for node
    # Third argument is algorithm selected
    arguments = ["ko00010.xml"
                ,"hsa04911.xml"
                ,'1']

    # Two pathways were given.
    if len(arguments) == 3:
    #if len(sys.argv) == 3: # CAMBIAR POR LA LISTA QUE VA TRAER LOS PARÁMETROS, 2 XML Y ALGORITMO, COMO EN LA LÍNEA 37.
        simpleKGMLStart1 = SimpleKGML(arguments[0])
        #simpleKGMLStart1 = SimpleKGML(sys.argv[X]) # CAMBIAR POR EL ÍNDICE QUE CONTENGA EL PATH AL XML NÚMERO 1.
        simpleKGML1 = SimpleKGML(arguments[0])
        #simpleKGML1 = SimpleKGML(sys.argv[X]) # CAMBIAR POR EL ÍNDICE QUE CONTENGA EL PATH AL XML NÚMERO 1.
        pathwayCompoundsGraph1 = simpleKGML1.getCompoundsGraph()

        simpleKGMLStart2 = SimpleKGML(arguments[1])
        #simpleKGMLStart2 = SimpleKGML(arguments[Y]) # CAMBIAR POR EL ÍNDICE QUE CONTENGA EL PATH AL XML NÚMERO 2.
        simpleKGML2 = SimpleKGML(arguments[1])
        #simpleKGML2 = SimpleKGML(arguments[Y]) # CAMBIAR POR EL ÍNDICE QUE CONTENGA EL PATH AL XML NÚMERO 2.
        pathwayCompoundsGraph2 = simpleKGML2.getCompoundsGraph()

        # Select algorithm to execute.
        if arguments[2] == '1':
        #if sys.argv[Z] == '1': # CAMBIAR POR EL ÍNDICE QUE CONTENGA EL NÚMERO DE ALGORITMO A EJECUTAR.
            try:
                metabolic_pathways_HTML_alg1(arguments[0],
                                            arguments[1],
                                            pathwayCompoundsGraph1,
                                            pathwayCompoundsGraph2)

                print(pathwayCompoundsGraph1)
                print(pathwayCompoundsGraph2)
            except:
                print("Error")
