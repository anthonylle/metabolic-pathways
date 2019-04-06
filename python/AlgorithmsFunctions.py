import json
from Kgml2Json import SimpleKGML
from AuxiliaryFunctions import *

# Code: C1
def createOneCompoundGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1):
    output = {}
    simpleKGMLStart1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    simpleKGML1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    pathwayCompoundsGraph1 = simpleKGML1.getCompoundsGraph()
    try:
        generateGraph(imagesFolderPath, XMLFileName1.replace(".xml", ""), pathwayCompoundsGraph1)
        output["Compound Graph 1"] = pathwayCompoundsGraph1
    except Exception as e: print(e)

    return output

# Code: C2
def createTwoCompoundGraphs(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    output = {}
    output["Compound Graph 1"] = createOneCompoundGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1)["Compound Graph 1"]
    output["Compound Graph 2"] = createOneCompoundGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName2)["Compound Graph 1"]
    return output

# Code: S1
def createOneCentralNodeGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1):
    output = {}
    simpleKGMLStart1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    simpleKGML1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    centralNodeGraph1 = simpleKGML1.getCentralNodeGraph()
    try:
        generateGraph(imagesFolderPath, XMLFileName1.replace(".xml", ""), centralNodeGraph1)
        output["Central Node Graph 1"] = centralNodeGraph1
    except Exception as e: print(e)

    return output

# Code: S2
def createTwoCentralNodeGraphs(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    output = {}
    output["Central Node Graph 1"] = createOneCentralNodeGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1)["Central Node Graph 1"]
    output["Central Node Graph 2"] = createOneCentralNodeGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName2)["Central Node Graph 1"]
    return output

# Code: A1T
def alg1Transformation2DtoVector(imagesFolderPath, tempUploadsFolderPath, pathwayGraph1, pathwayGraph2):
    return "Ok"

# Code: A1T1
def alg1_1GraphTraversal_AnyNodeToAnyNode(imagesFolderPath, tempUploadsFolderPath, pathwayGraph1, pathwayGraph2):
    output = {}
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

    output["BFT1"] = renamedPath(bft1)
    output["BFT2"] = renamedPath(bft2)
    output["DFT1"] = renamedPath(dft1)
    output["DFT2"] = renamedPath(dft2)
    output["Global BFT"] = needleman_wunsch(renamedPath(bft1), renamedPath(bft2))
    output["Global DFT"] = needleman_wunsch(renamedPath(dft1), renamedPath(dft2))
    output["Local BFT"] = local_alignment(renamedPath(bft1), renamedPath(bft2))
    output["Local DFT"] = local_alignment(renamedPath(dft1), renamedPath(dft2))
    output["SemiLocal BFT"] = semiglobal_alignment(renamedPath(bft1), renamedPath(bft2))
    output["SemiLocal DFT"] = semiglobal_alignment(renamedPath(dft1), renamedPath(dft2))
    output["Differences 1-2"] = identify_differences(graph1, graph2, FULL)
    output["Differences 2-1"] = identify_differences(graph2, graph1, FULL)

    return output

# Code: A1T2
def alg1_2GraphTraversal_GivenNodeToAnyNode(imagesFolderPath, tempUploadsFolderPath, pathwayGraph1, pathwayGraph2, startNodeGraph1, startNodeGraph2):
    output = {}
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

    output["BFT1"] = renamedPath(bft1)
    output["BFT2"] = renamedPath(bft2)
    output["DFT1"] = renamedPath(dft1)
    output["DFT2"] = renamedPath(dft2)
    output["Global BFT"] = needleman_wunsch(renamedPath(bft1), renamedPath(bft2))
    output["Global DFT"] = needleman_wunsch(renamedPath(dft1), renamedPath(dft2))
    output["Local BFT"] = local_alignment(renamedPath(bft1), renamedPath(bft2))
    output["Local DFT"] = local_alignment(renamedPath(dft1), renamedPath(dft2))
    output["SemiLocal BFT"] = semiglobal_alignment(renamedPath(bft1), renamedPath(bft2))
    output["SemiLocal DFT"] = semiglobal_alignment(renamedPath(dft1), renamedPath(dft2))
    output["Differences 1-2"] = identify_differences(graph1, graph2, FULL)
    output["Differences 2-1"] = identify_differences(graph2, graph1, FULL)

    return output

# Code: A1T3
def alg1_3GraphTraversal_GivenNodeToGivenNode(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

# Code: A1T4
def alg1_4EvalPossiblePaths_GivenNodeToGivenNode(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

# Code: A1T5
def alg1_5GraphTraversal_AnyNodeToGivenNode(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

# Code: A2
def alg2DifferentiationByPairs(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

# Code: A3
def alg3_NameTBD(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"
