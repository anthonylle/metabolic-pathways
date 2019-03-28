import kgml2Json
from bio.KEGG.KGML.KGML_parser import read

class SimpleKGML:
    def __init__(self, filePath):
        self.compoundsGraph = {}
        self.bioKGML = read(open(filePath, 'r'))
        self._fillGraph()
