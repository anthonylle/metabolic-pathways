import unittest
#import run
from kgml2Json import SimpleKGML
import NewMain
#from test import autotest

class testPython(unittest.TestCase):
    def test_kgml2Json_1(self):
        print("test_kgml2Json")
        simpleKGML1 = SimpleKGML("C:/Users/Daniel/Desktop/ko00010.xml")
        result = simpleKGML1.getCompoundsGraph()
        self.assertEqual(result, {'C00084': ['C00033', 'C00033', 'C00033'], 'C00024': ['C00033', 'C16255', 'C00022'], 'C05125': ['C00084', 'C00068', 'C16255'], 'C00469': ['C00084', 'C00084', 'C00084', 'C00084', 'C00084', 'C00084'], 'C00068': ['C05125', 'C05125'], 'C00022': ['C05125', 'C05125', 'C00024'], 'C15972': ['C00068', 'C16255'], 'C15973': ['C16255', 'C15972'], 'C00186': ['C00022'], 'C00074': ['C00022'], 'C00631': ['C00074', 'C00197', 'C00197'], 'C00118': ['C00236', 'C00111', 'C00236', 'C00197', 'C00197', 'C00197'], 'C05378': ['C00111', 'C00118', 'C05345'], 'C05345': ['C05378', 'C05378', 'C05378'], 'C00031': ['C00668'], 'C00668': ['C05345', 'C01172', 'C01172', 'C00267'], 'C00103': ['C00668', 'C00267'], 'C01172': ['C05345'], 'C00221': ['C01172', 'C01172', 'C01172', 'C01172'], 'C00267': ['C00221', 'C00668', 'C00668', 'C00668', 'C00668'], 'C00197': ['C00236'], 'C06186': ['C06187'], 'C01451': ['C06188'], 'C06187': ['C01172'], 'C06188': ['C01172'], 'C00036': ['C00074', 'C00074'], 'C01159': ['C00197', 'C00631'], 'C00236': ['C01159'], 'C00033': ['C00024']})
        print("--- Test End ---\n")

    def test_kgml2Json_2(self):
        print("test_kgml2Json")
        simpleKGML1 = SimpleKGML("C:/Users/Daniel/Desktop/cit00710.xml")
        result = simpleKGML1.getCompoundsGraph()
        self.assertEqual(result, {'C00011': ['C00036', 'C00197', 'C00036'], 'C00074': ['C00036', 'C00036'], 'C00036': ['C00149', 'C00149', 'C00149', 'C00011', 'C00074'], 'C00149': ['C00011', 'C00022', 'C00022', 'C00022'], 'C00049': ['C00036', 'C00036'], 'C00022': ['C00041', 'C00074', 'C00074'], 'C00111': ['C00447'], 'C00279': ['C00447'], 'C00447': ['C05382'], 'C05382': ['C00117', 'C00231'], 'C00118': ['C00117', 'C00231', 'C00354', 'C00111', 'C00279', 'C00231'], 'C00117': ['C00199'], 'C00199': ['C01182'], 'C00231': ['C00199'], 'C00354': ['C00085'], 'C00236': ['C00118', 'C00118'], 'C00197': ['C00236'], 'C00001': ['C00197'], 'C01182': ['C00197'], 'C00085': ['C00279', 'C00231'], 'C00041': ['C00022']})
        print("--- Test End ---\n")

    def test_kgml2Json_3(self):
        print("test_kgml2Json")
        simpleKGML1 = SimpleKGML("C:/Users/Daniel/Desktop/hsa00260.xml")
        result = simpleKGML1.getCompoundsGraph()
        self.assertEqual(result, {'C00065': ['C00740', 'C00037', 'C00168', 'C02291', 'C00022', 'C00022', 'C00168', 'C00097'], 'C00114': ['C00576'], 'C00576': ['C00719'], 'C00719': ['C01026'], 'C00581': ['C00300'], 'C00197': ['C03232'], 'C01026': ['C00213'], 'C02291': ['C00097'], 'C00037': ['C00581', 'C00065', 'C00048', 'C03508', 'C00011', 'C01242', 'C00430', 'C00213', 'C00048'], 'C01005': ['C03232', 'C00065'], 'C00213': ['C00037', 'C00037'], 'C00143': ['C00065'], 'C00188': ['C00109'], 'C02051': ['C00011', 'C01242'], 'C01888': ['C00546', 'C00546'], 'C00258': ['C00168', 'C00631'], 'C00101': ['C00014', 'C00143', 'C02972'], 'C01242': ['C00014', 'C00143', 'C02972'], 'C02972': ['C02051'], 'C00631': ['C00197']})
        print("--- Test End ---\n")

    def test_kgml2Json_4(self):
        print("test_kgml2Json")
        simpleKGML1 = SimpleKGML("C:/Users/Daniel/Desktop/hsa00750.xml")
        result = simpleKGML1.getCompoundsGraph()
        self.assertEqual(result, {'C06055': ['C06054'], 'C00627': ['C00018', 'C00314'], 'C00647': ['C00018', 'C00534'], 'C00314': ['C00627', 'C00250'], 'C00018': ['C00250'], 'C00250': ['C00018', 'C00847'], 'C00534': ['C00647', 'C00250']})
        print("--- Test End ---\n")

    def test_kgml2Json_5(self):
        print("test_kgml2Json")
        simpleKGML1 = SimpleKGML("C:/Users/Daniel/Desktop/hsa00630.xml")
        result = simpleKGML1.getCompoundsGraph()
        self.assertEqual(result, {'C00168': ['C01146', 'C00258', 'C00258'], 'C00417': ['C00311', 'C00158'], 'C01127': ['C00048', 'C00022'], 'C06049': ['C00058'], 'C00160': ['C00048', 'C00048'], 'C00158': ['C00036'], 'C00149': ['C00036'], 'C00988': ['C00160'], 'C00024': ['C00332'], 'C00683': ['C01213'], 'C00100': ['C00683'], 'C01213': ['C00091'], 'C00048': ['C00037', 'C00168'], 'C00065': ['C00037', 'C00168'], 'C00037': ['C00065', 'C00014'], 'C00027': ['C00007'], 'C00025': ['C00064'], 'C18026': ['C20238'], 'C00258': ['C00631'], 'C00033': ['C00024']})
        print("--- Test End ---\n")

    def test_kgml2Json_5(self):
        print("test_kgml2Json")
        simpleKGML1 = SimpleKGML("C:/Users/Daniel/Desktop/hsa00630.xml")
        dictionary = simpleKGML1.getCompoundsGraph()

        print("--- Test End ---\n")

if __name__ == '__main__':
    unittest.main()
