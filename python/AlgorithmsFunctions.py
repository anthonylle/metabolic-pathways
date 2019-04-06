import json
from Kgml2Json import SimpleKGML
from AuxiliaryFunctions import *

# Code: C1
def createOneCompoundGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2 = None):
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
def createOneCentralNodeGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, EmptyString = None):
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
# Input example: '{'C00084': ['C00033', ...], ... , 'C00033': ['C00024']}',
#                '{'C00065': ['C00740', ...], ... , 'C00631': ['C00197']}'
def alg1_1GraphTraversal_AnyNodeToAnyNode(imagesFolderPath, tempUploadsFolderPath, pathwayGraph1, pathwayGraph2):
    return json.dumps(alg1_1GraphTraversal_AnyNodeToAnyNode_Algorithm(pathwayGraph1, pathwayGraph2))

# Code: A1T2
def alg1_2GraphTraversal_GivenNodeToAnyNode(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

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
