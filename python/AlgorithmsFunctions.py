from NewKgml2Json import SimpleKGML
from AuxiliaryFunctions import *

def createOneCompoundGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, EmptyString = None):
    simpleKGMLStart1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    simpleKGML1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    pathwayCompoundsGraph1 = simpleKGML1.getCompoundsGraph()
    try:
        generateGraph(imagesFolderPath, XMLFileName1.replace(".xml", ""), pathwayCompoundsGraph1)
    except Exception as e: print(e)
    return pathwayCompoundsGraph1

def createTwoCompoundGraphs(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    pathwayCompoundsGraph1 = createOneCompoundGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1)
    pathwayCompoundsGraph2 = createOneCompoundGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName2)
    return str(pathwayCompoundsGraph1) + str(pathwayCompoundsGraph2)

def createOneCentralNodeGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, EmptyString = None):
    simpleKGMLStart1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    simpleKGML1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    centralNodeGraph1 = simpleKGML1.getCentralNodeGraph()
    try:
        generateGraph(imagesFolderPath, XMLFileName1.replace(".xml", ""), centralNodeGraph1)
    except Exception as e: print(e)
    return centralNodeGraph1

def createTwoCentralNodeGraphs(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    centralNodeGraph1 = createOneCentralNodeGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1)
    centralNodeGraph2 = createOneCentralNodeGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName2)
    return str(centralNodeGraph1) + str(centralNodeGraph2)

def alg1Transformation2DtoVector(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

def alg2DifferentiationByPairs(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

def alg1_1GraphTraversal_AnyNodeToAnyNode(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

def alg1_2GraphTraversal_GivenNodeToAnyNode(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

def alg1_3GraphTraversal_GivenNodeToGivenNode(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

def alg1_4EvalPossiblePaths_GivenNodeToGivenNode(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

def alg1_5GraphTraversal_AnyNodeToGivenNode(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

def alg3_NameTBD(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"
