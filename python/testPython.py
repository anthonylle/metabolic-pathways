import unittest
from AlgorithmsFunctions import *
from TestPythonAuxiliary import *

class testPython(unittest.TestCase):
    maxDiff = None

    def test_alg1Transformation2DtoVector(self):
        result = alg1Transformation2DtoVector(inputTest.get("Pathway1"),
                                              inputTest.get("Pathway2"),
                                              inputTest.get("A1_2"),
                                              inputTest.get("A1_3"),
                                              inputTest.get("A1_4"))
        self.assertEqual(result, expectedResults.get("A1"))

    def test_alg1_1GraphTraversal_AnyNodeToAnyNode(self):
        result = alg1_1GraphTraversal_AnyNodeToAnyNode(inputTest.get("Pathway1"),
                                                        inputTest.get("Pathway2"),
                                                        inputTest.get("A1T1_2"),
                                                        inputTest.get("A1T1_3"),
                                                        inputTest.get("A1T1_4"))
        self.assertEqual(result, expectedResults.get("A1T1"))

    def test_alg1_2GraphTraversal_GivenNodeToAnyNode(self):
        result = alg1_2GraphTraversal_GivenNodeToAnyNode(inputTest.get("Pathway1"),
                                                         inputTest.get("Pathway2"),
                                                         inputTest.get("A1T2_2"),
                                                         inputTest.get("A1T2_3"),
                                                         inputTest.get("A1T2_4"),
                                                         inputTest.get("A1T2_5"),
                                                         inputTest.get("A1T2_6"))
        self.assertEqual(result, expectedResults.get("A1T2"))

    def test_alg1_3GraphTraversal_GivenNodeToGivenNode(self):
        result = alg1_3GraphTraversal_GivenNodeToGivenNode(inputTest.get("Pathway1"),
                                                           inputTest.get("Pathway2"),
                                                           inputTest.get("A1T3_2"),
                                                           inputTest.get("A1T3_3"),
                                                           inputTest.get("A1T3_4"),
                                                           inputTest.get("A1T3_5"),
                                                           inputTest.get("A1T3_6"),
                                                           inputTest.get("A1T3_7"),
                                                           inputTest.get("A1T3_8"))
        self.assertEqual(result, expectedResults.get("A1T3"))

    def test_alg1_4EvalPossiblePaths_GivenNodeToGivenNode(self):
        result = alg1_4EvalPossiblePaths_GivenNodeToGivenNode(inputTest.get("Pathway1"),
                                                              inputTest.get("Pathway2"),
                                                              inputTest.get("A1T4_2"),
                                                              inputTest.get("A1T4_3"),
                                                              inputTest.get("A1T4_4"),
                                                              inputTest.get("A1T4_5"),
                                                              inputTest.get("A1T4_6"))
        self.assertEqual(result, expectedResults.get("A1T4"))

    def test_alg1_5GraphTraversal_AnyNodeToGivenNode(self):
        result = alg1_5GraphTraversal_AnyNodeToGivenNode(inputTest.get("Pathway1"),
                                                         inputTest.get("Pathway2"),
                                                         inputTest.get("A1T5_2"),
                                                         inputTest.get("A1T5_3"),
                                                         inputTest.get("A1T5_4"),
                                                         inputTest.get("A1T5_5"),
                                                         inputTest.get("A1T5_6"))
        self.assertEqual(result, expectedResults.get("A1T5"))

    def test_alg2_DifferentiationByPairs(self):
        result = alg2_DifferentiationByPairs(inputTest.get("Pathway1"),
                                             inputTest.get("Pathway2"))
        self.assertEqual(result, expectedResults.get("A2"))

if __name__ == '__main__':
    unittest.main()
