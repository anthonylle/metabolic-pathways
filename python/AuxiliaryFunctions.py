import base64
import sys
import os
import string
from graphviz import Digraph
from local_alignment import local_alignment
from global_alignment import needleman_wunsch
from semiglobal_alignment import semiglobal_alignment
from graph import *

# Global variables
level = -1
letter = 0
LOW = 0
FULL = 1
dictionary = {}

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

def addToDictionary(path):
    for node in path:
        if not node in dictionary:
            global letter, level
            if letter % 26 == 0:
                level += 1
            dictionary[node] = string.ascii_uppercase[letter % 26] + str(level)
            letter += 1

def showDictionary():
    inv_dictionary = {v: k for k, v in dictionary.items()}
    sorted_dict = sorted(inv_dictionary.items(), key = operator.itemgetter(0))
    for tuple in sorted_dict:
        print(str(tuple[0]) + "->" + str(tuple[1]))

def renamedPath(path):
    renamed = []
    for node in path:
        renamed.append(dictionary[node])
    return renamed

def identify_equality(graph0, graph1, detail):
    equality = False
    for node in graph0.get_nodes():
        for edge in node.get_edges():
            value1 = node.get_value()
            value2 = edge.get_value()
            if value1 != '*':
                if graph1.exists_edge(str(value1), str(value2)):
                    equality = True

def identify_differences(graph0, graph1, detail):
    differences = False
    for node in graph0.get_nodes():
        for edge in node.get_edges():
            value1 = node.get_value()
            value2 = edge.get_value()
            if value1 != '*':
                if not graph1.exists_edge(str(value1), str(value2)):
                    differences = True

# Algorithm 1
def metabolic_pathways_HTML_alg1(xmlPath1, xmlPath2, pathway0, pathway1):
    # Gets file name for graph image.
    fileName1 = xmlPath1[len(xmlPath1) - int(xmlPath1[::-1].find('/')): -4]
    fileName2 = xmlPath2[len(xmlPath2) - int(xmlPath2[::-1].find('/')): -4]

    g1 = generate_graph(fileName1, pathway0)
    g2 = generate_graph(fileName2, pathway1)
