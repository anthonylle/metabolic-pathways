import json
import graph

from Bio.KEGG.KGML.KGML_parser import read

class SimpleKGML:
    def __init__(self, filePath):
        self.compoundsGraph = {}
        self.bioKGML = read(open(filePath,'r'))
        self._fillGraph()
    
    def _fillGraph(self):
        for reaction in self.bioKGML.reactions:
            substrates, products = reaction.substrates, reaction.products
            for entry in substrates:
                entry = entry.name[4:]
                for product in products:
                    product = product.name[4:]

                    if entry in self.compoundsGraph:
                        self.compoundsGraph[entry].append(product)
                    else:
                        self.compoundsGraph[entry] = [product]

    def getCompoundsGraph(self):
        return self.compoundsGraph

    def getWithCentralNodeAsString(self):
        starGraph = self.compoundsGraph
        starGraph["*"] = [_ for _ in self.compoundsGraph]

        return starGraph

SK    = SimpleKGML("C:\\Users\\Lenovo\\Desktop\\Rutas\\bap00030.xml")
G     = graph.to_graph_from_dict(SK.getCompoundsGraph())
#start = G.get_node("C00514") ecm
#end   = G.get_node("C04349")

#start = G.get_node("C00668") 
#end   = G.get_node("C00231")
#hsa- bpa
start = G.get_node("C00668")
end   = G.get_node("C00231")
paths = G.get_cyclic_paths(start, end, [],3)
for p in paths:
    out = ""
    for node in p:
        out += node.get_value() + "->"
    print out

def print_graph(G):
    for node in G.get_nodes():
        print node.get_value()
        for edge in node.get_edges():
            print "   " + edge.get_value()
