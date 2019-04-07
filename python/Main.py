from AlgorithmsFunctions import *

# Global variables
#horizontal_graph = False # Generate horizontal image
algorithmTypes = {
    "C1": [3, createOneCompoundGraph],
    "C2": [4, createTwoCompoundGraphs],
    "S1": [3, createOneCentralNodeGraph],
    "S2": [4, createTwoCentralNodeGraphs],
    "NIndex": [3, getGraphNodesIndexes],
    "GPaths": [6, getGraphPathsIndexes],
    "A1T": [4, alg1Transformation2DtoVector],
    "A1T1": [4, alg1_1GraphTraversal_AnyNodeToAnyNode],
    "A1T2": [6, alg1_2GraphTraversal_GivenNodeToAnyNode],
    "A1T3": [8, alg1_3GraphTraversal_GivenNodeToGivenNode],
    "A1T4": [6, alg1_4EvalPossiblePaths_GivenNodeToGivenNode],
    "A1T5": [6, alg1_5GraphTraversal_AnyNodeToGivenNode],
    "A2": [4, alg2DifferentiationByPairs],
    "A3": [0, alg3_NameTBD]
}

# Parameters received: [pathToPythonFile, XMLFileName1, [XMLFileName2], requestType]
# Example: ['./python/NewMain.py', 'ko00010.xml', 'hsa00260.xml', 'S2']
if __name__ == '__main__':
    # Used to get path to temp_uploads folder.
    imagesFolderPath = os.getcwd().replace('\\', '/') + "/images/"
    tempUploadsFolderPath = os.getcwd().replace('\\', '/') + "/temp_uploads/"

    # Check if request received is valid.
    if algorithmTypes.get(sys.argv[-1]) != None:
        # Get the function and number of parameters needed to complete the request.
        parametersNumber = algorithmTypes.get(sys.argv[-1])[0]
        functionToCall = algorithmTypes.get(sys.argv[-1])[1]

        if len(sys.argv) == parametersNumber:
            if parametersNumber == 3:
                if sys.argv[-1] == "NIndex":
                    print(functionToCall(sys.argv[1]))
                else:
                    print(functionToCall(imagesFolderPath, tempUploadsFolderPath,
                                        sys.argv[1]))
            elif parametersNumber == 4:
                print(functionToCall(imagesFolderPath, tempUploadsFolderPath,
                                    sys.argv[1], sys.argv[2]))
            elif parametersNumber == 6:
                if sys.argv[-1] == "GPaths":
                    print(functionToCall(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]))
                else:
                    print(functionToCall(imagesFolderPath, tempUploadsFolderPath,
                                        sys.argv[1], sys.argv[2],
                                        sys.argv[3], sys.argv[4]))
            elif parametersNumber == 8:
                print(functionToCall(imagesFolderPath, tempUploadsFolderPath,
                                    sys.argv[1], sys.argv[2],
                                    sys.argv[3], sys.argv[4],
                                    sys.argv[5], sys.argv[6]))
            elif parametersNumber == 9:
                print(functionToCall(imagesFolderPath, tempUploadsFolderPath,
                                    sys.argv[1], sys.argv[2],
                                    sys.argv[3], sys.argv[4],
                                    sys.argv[5], sys.argv[6],
                                    sys.argv[7]))
        else:
            print("ERROR: incorrect number of parameters.")
    else:
        print("ERROR: request unknown.")
    #sys.stdout.flush()
