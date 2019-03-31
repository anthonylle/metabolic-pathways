from Kgml2Json import SimpleKGML
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

def alg1Transformation2DtoVector(imagesFolderPath, tempUploadsFolderPath, pathwayGraph1, pathwayGraph2):
    return "Ok"

def alg2DifferentiationByPairs(imagesFolderPath, tempUploadsFolderPath, XMLFileName1, XMLFileName2):
    return "Ok"

def alg1_1GraphTraversal_AnyNodeToAnyNode(imagesFolderPath, tempUploadsFolderPath, pathwayGraph1, pathwayGraph2):
    pathwayGraph1 = "{'C00084': ['C00033', 'C00033', 'C00033'], 'C00024': ['C00033', 'C16255', 'C00022'], 'C05125': ['C00084', 'C00068', 'C16255'], 'C00469': ['C00084', 'C00084', 'C00084', 'C00084', 'C00084', 'C00084'], 'C00068': ['C05125', 'C05125'], 'C00022': ['C05125', 'C05125', 'C00024'], 'C15972': ['C00068', 'C16255'], 'C15973': ['C16255', 'C15972'], 'C00186': ['C00022'], 'C00074': ['C00022'], 'C00631': ['C00074', 'C00197', 'C00197'], 'C00118': ['C00236', 'C00111', 'C00236', 'C00197', 'C00197', 'C00197'], 'C05378': ['C00111', 'C00118', 'C05345'], 'C05345': ['C05378', 'C05378', 'C05378'], 'C00031': ['C00668'], 'C00668': ['C05345', 'C01172', 'C01172', 'C00267'], 'C00103': ['C00668', 'C00267'], 'C01172': ['C05345'], 'C00221': ['C01172', 'C01172', 'C01172', 'C01172'], 'C00267': ['C00221', 'C00668', 'C00668', 'C00668', 'C00668'], 'C00197': ['C00236'], 'C06186': ['C06187'], 'C01451': ['C06188'], 'C06187': ['C01172'], 'C06188': ['C01172'], 'C00036': ['C00074', 'C00074'], 'C01159': ['C00197', 'C00631'], 'C00236': ['C01159'], 'C00033': ['C00024'], '*': ['C00084', 'C00024', 'C05125', 'C00469', 'C00068', 'C00022', 'C15972', 'C15973', 'C00186', 'C00074', 'C00631', 'C00118', 'C05378', 'C05345', 'C00031', 'C00668', 'C00103', 'C01172', 'C00221', 'C00267', 'C00197', 'C06186', 'C01451', 'C06187', 'C06188', 'C00036', 'C01159', 'C00236', 'C00033']}"

    pathwayGraph2 = "{'C00065': ['C00740', 'C00037', 'C00168', 'C02291', 'C00022', 'C00022', 'C00168', 'C00097'], 'C00114': ['C00576'], 'C00576': ['C00719'], 'C00719': ['C01026'], 'C00581': ['C00300'], 'C00197': ['C03232'], 'C01026': ['C00213'], 'C02291': ['C00097'], 'C00037': ['C00581', 'C00065', 'C00048', 'C03508', 'C00011', 'C01242', 'C00430', 'C00213', 'C00048'], 'C01005': ['C03232', 'C00065'], 'C00213': ['C00037', 'C00037'], 'C00143': ['C00065'], 'C00188': ['C00109'], 'C02051': ['C00011', 'C01242'], 'C01888': ['C00546', 'C00546'], 'C00258': ['C00168', 'C00631'], 'C00101': ['C00014', 'C00143', 'C02972'], 'C01242': ['C00014', 'C00143', 'C02972'], 'C02972': ['C02051'], 'C00631': ['C00197'], '*': ['C00065', 'C00114', 'C00576', 'C00719', 'C00581', 'C00197', 'C01026', 'C02291', 'C00037', 'C01005', 'C00213', 'C00143', 'C00188', 'C02051', 'C01888', 'C00258', 'C00101', 'C01242', 'C02972', 'C00631']}"

    return alg1_1GraphTraversal_AnyNodeToAnyNode_Algorithm(pathwayGraph1, pathwayGraph2)

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
