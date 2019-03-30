from NewKgml2Json import SimpleKGML
from AuxiliaryFunctions import *

def createOneCompoundGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, EmptyString):
    simpleKGMLStart1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    simpleKGML1 = SimpleKGML(tempUploadsFolderPath + XMLFileName1)
    pathwayCompoundsGraph1 = simpleKGML1.getCompoundsGraph()

    try:
        generateGraph(imagesFolderPath, XMLFileName1.replace(".xml", ""), pathwayCompoundsGraph1)
    except Exception as e: print(e)

    return pathwayCompoundsGraph1

def createTwoCompoundGraphs(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

def createOneStarGraph(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, EmptyString):
    return "Ok"

def createTwoStarGraphs(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

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
