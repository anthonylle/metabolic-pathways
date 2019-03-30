from AlgorithmsFunctions import *

# Global variables
#horizontal_graph = False # Generate horizontal image
algorithmTypes = {
    "C1": createOneCompoundGraph,
    "C2": createTwoCompoundGraphs,
    "S1": createOneStarGraph,
    "S2": createTwoStarGraphs,
    "A1T": alg1Transformation2DtoVector,
    "A1D": alg2DifferentiationByPairs,
    "A2T1": alg1_1GraphTraversal_AnyNodeToAnyNode,
    "A2T2": alg1_2GraphTraversal_GivenNodeToAnyNode,
    "A2T3": alg1_3GraphTraversal_GivenNodeToGivenNode,
    "A2T4": alg1_4EvalPossiblePaths_GivenNodeToGivenNode,
    "A2T5": alg1_5GraphTraversal_AnyNodeToGivenNode,
    "A2T3": alg3_NameTBD
}

# Parameters received: [pathToPythonFile, XMLFileName1, [XMLFileName2], requestType]
if __name__ == '__main__':
    # Used to get path to temp_uploads folder.
    tempUploadsFolderPath = os.getcwd().replace('\\', '/') + "/temp_uploads/"
    imagesFolderPath = os.getcwd().replace('\\', '/') + "/images/"
    print(imagesFolderPath)
    # Get the function needed to complete the request.
    functionToCall = algorithmTypes.get(sys.argv[3])

    if functionToCall != None:
        print(functionToCall(imagesFolderPath, tempUploadsFolderPath, sys.argv[1], sys.argv[2]))
    else:
        print("Error, request unknown.")

    input()
    #print("Arguments given: ", sys.argv)
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
        except Exception as e: print(e)

    else:
            print("Error, request unknown.")

    sys.stdout.flush()
