import base64
import sys
import os
import string
from graphviz import Digraph
from OldFiles.local_alignment import local_alignment
from OldFiles.global_alignment import needleman_wunsch
from OldFiles.semiglobal_alignment import semiglobal_alignment
from OldFiles.graph import *

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
    inv_dictionary = {v: k for k, v in dictionary.iteritems()}
    sorted_dict = sorted(inv_dictionary.items(), key = operator.itemgetter(0))
    for tuple in sorted_dict:
        print(str(tuple[0]) + "->" + str(tuple[1]))

def renamedPath(path):
    renamed = []
    for node in path:
        renamed.append(dictionary[node])
    return renamed

# Taken from original files
def alg1_1GraphTraversal_AnyNodeToAnyNode_Algorithm(pathwayGraph1, pathwayGraph2):
    #g1 = generateGraph(pathwayGraph1)
    #g2 = generateGraph(pathwayGraph2)
    graph1 = to_graph_from_dict(pathwayGraph1)
    graph2 = to_graph_from_dict(pathwayGraph2)

    bft1 = graph1.breadth_first_traversal()
    bft2 = graph2.breadth_first_traversal()
    dft1 = graph1.depth_first_traversal()
    dft2 = graph2.depth_first_traversal()
    addToDictionary(bft1)
    addToDictionary(bft2)
    addToDictionary(dft1)
    addToDictionary(dft2)

    # Low Detail Output
    globNeed = [needleman_wunsch(renamedPath(bft1), renamedPath(bft2)), needleman_wunsch(renamedPath(dft1), renamedPath(dft2))]
    localAlignment = [local_alignment(renamedPath(bft1), renamedPath(bft2)), local_alignment(renamedPath(dft1), renamedPath(dft2))]
    semiLocalAlignment = [semiglobal_alignment(renamedPath(bft1), renamedPath(bft2)), semiglobal_alignment(renamedPath(dft1), renamedPath(dft2))]

    show_dictionary()
    identify_equality(graph1, graph2, LOW)
    identify_differences(graph1, graph2, FULL)
    identify_differences(graph2, graph1, FULL)

    result = str(show_dictionary()) + str(identify_equality(graph1, graph2, LOW)) + str(identify_differences(graph1, graph2, FULL)) + str(identify_differences(graph2, graph1, FULL))

    return result

# Algorithm 1
def metabolic_pathways_HTML_alg1(xmlPath1, xmlPath2, pathway0, pathway1):
    # Gets file name for graph image.
    fileName1 = xmlPath1[len(xmlPath1) - int(xmlPath1[::-1].find('/')): -4]
    fileName2 = xmlPath2[len(xmlPath2) - int(xmlPath2[::-1].find('/')): -4]

    g1 = generate_graph(fileName1, pathway0)
    g2 = generate_graph(fileName2, pathway1)
