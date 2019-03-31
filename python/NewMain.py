from AlgorithmsFunctions import *

# Global variables
#horizontal_graph = False # Generate horizontal image
algorithmTypes = {
    "C1": createOneCompoundGraph,
    "C2": createTwoCompoundGraphs,
    "S1": createOneCentralNodeGraph,
    "S2": createTwoCentralNodeGraphs,
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

    # Get the function needed to complete the request.
    functionToCall = algorithmTypes.get(sys.argv[3])

    # Check if request is valid.
    if functionToCall != None:
        print(functionToCall(imagesFolderPath, tempUploadsFolderPath, sys.argv[1], sys.argv[2]))
    else:
        print("ERROR: request unknown.")

    #sys.stdout.flush()
