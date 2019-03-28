import base64
import sys
import os

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
    # Parameters received: [pythonFilePath, fileName1, fileName2, requestType]

    staticPath = os.getcwd().replace('\\', '/').replace('python', '') + "/temp_uploads/"
    print("Arguments given: ", sys.argv)
    #staticPath = "C:/Users/Daniel/Documents/Git/MetabolicPathwasGitHub/metabolic-pathways/temp_uploads/"
    #sys.argv = ['0',"ko00010.xml","hsa00260.xml",'1']
    #sys.argv[1] = 'cit00710.xml'
    #sys.argv[2] = 'hsa00260.xml'
    if sys.argv[3] == '1':
        simpleKGMLStart1 = SimpleKGML(staticPath + sys.argv[1])
        simpleKGML1 = SimpleKGML(staticPath + sys.argv[1])
        pathwayCompoundsGraph1 = simpleKGML1.getCompoundsGraph()

        simpleKGMLStart2 = SimpleKGML(staticPath + sys.argv[2])
        simpleKGML2 = SimpleKGML(staticPath + sys.argv[2])
        pathwayCompoundsGraph2 = simpleKGML2.getCompoundsGraph()

        try:
            metabolic_pathways_HTML_alg1(staticPath + sys.argv[1],
                                        staticPath + sys.argv[2],
                                        pathwayCompoundsGraph1,
                                        pathwayCompoundsGraph2)

            print(pathwayCompoundsGraph1)
            print(pathwayCompoundsGraph2)
        except:
            print("Error")

    else:
            print("Error, request unknown.")

    sys.stdout.flush()
