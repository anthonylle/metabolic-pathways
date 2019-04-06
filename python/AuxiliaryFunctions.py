import base64
import sys
import os
from graphviz import Digraph

def generateGraph(imagesFolderPath, XMLFileName, pathwayCompoundsGraph):
    g = Digraph('G', format='png')
    #if(horizontalGraph):
    #    g.attr(rankdir='LR')
    for k in pathwayCompoundsGraph.keys():
        g.node(k)
        for v in pathwayCompoundsGraph[k]:
            g.edge(k, v)
    g.render(imagesFolderPath + XMLFileName)

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
