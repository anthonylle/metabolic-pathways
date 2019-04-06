import json
import operator
from os import walk
import sys
import datetime
import string
import pprint
from collections import OrderedDict

# KGML to JSON
from kgml2Json import SimpleKGML

# Graph
from graph import *

# Aligment Algorithms
from local_alignment import local_alignment
from global_alignment import needleman_wunsch
from semiglobal_alignment import semiglobal_alignment

level = -1
letter = 0
LOW = 0
FULL = 1
dictionary = {}

file = ""

def redirectOut():
	global file
	filename   = datetime.datetime.now().strftime("generated/%Y%m%d%H%M%S.html")
	file = open(filename, 'w')
	sys.stdout = file


def restoreOut():
	global file
	sys.stdout = sys.__stdout__
	file.close()


def add_to_dictionary(path):
	for node in path:
		if not node in dictionary:
			global letter, level
			if letter % 26 == 0:
				level = level + 1
			dictionary[node] = string.ascii_uppercase[letter % 26] + str(level)
			letter = letter + 1

# return renamed path from dictIonary
def renamed_path(path):
	renamed = []
	for node in path:
		renamed.append(dictionary[node])
	return renamed

def show_dictionary():
	print "<p>" , "Dictionary", "</p>"
	inv_dictionary = {v: k for k, v in dictionary.iteritems()}
	sorted_dict = sorted(inv_dictionary.items(), key=operator.itemgetter(0))
	for tuple in sorted_dict:
		print("<p class='dict-entry'>" + str(tuple[0]) + " -> " + str(tuple[1]) + "</p>")

def identify_equality(graph0, graph1, detail):
	equality = False
	for node in graph0.get_nodes():
		for edge in node.get_edges():
			value1 = node.get_value()
			value2 = edge.get_value()
			if value1 != '*':
				if graph1.exists_edge(str(value1), str(value2)):
					equality = True
					if detail:
						print "<p class='indentify'>" + str(value1) + " -> " + str(value2) + "</p>"
					else:
						if value1 in dictionary and value2 in dictionary:
							print "<p class='indentify'>" + str(dictionary[value1]) + " -> " + str(dictionary[value2]) + "</p>"
	if not equality:
		print "<p>None Found</p>"

def identify_differences(graph0, graph1, detail):
	differences = False
	for node in graph0.get_nodes():
		for edge in node.get_edges():
			value1 = node.get_value()
			value2 = edge.get_value()
			if value1 != '*':
				if not graph1.exists_edge(str(value1), str(value2)):
					differences = True
					if detail:
						print "<p class='indentify'>" + str(value1) + " -> " + str(value2) + "</p>"
					else:
						if value1 in dictionary and value2 in dictionary:
							print "<p class='indentify'>" + str(dictionary[value1]) + " -> " + str(dictionary[value2]) + "</p>"
	if not differences:
		print "<p>None Found</p>"


#Algorithm 1
def metabolic_pathways_HTML_alg1(pathway0, pathway1):
	redirectOut()
	# graph creation
	graph0 = to_graph_from_dict(pathway0)
	graph1 = to_graph_from_dict(pathway1)

	bft0 = graph0.breadth_first_traversal()
	dft0 = graph0.depth_first_traversal()
	add_to_dictionary(bft0)
	add_to_dictionary(dft0)
	bft1 = graph1.breadth_first_traversal()
	dft1 = graph1.depth_first_traversal()
	add_to_dictionary(bft1)
	add_to_dictionary(dft1)



	# Full Detail Output
	print "<h4>Full Detail Output</h4>"
	print "<p>Breadth First Traversal (BFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(bft0), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(bft1), "</p>"
	print '<br>'
	print "<p>Depth First Traversal (DFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(dft0), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(dft1), "</p>"
	print "<br>"
	show_dictionary()
	# Low Detail Output
	print "<h4>Low Detail Output</h4>"
	print "<p>Breadth First Search (BFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(renamed_path(bft0)), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(renamed_path(bft1)), "</p>"
	print "<br>"
	print "<p>Depth First Search (DFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(renamed_path(dft0)), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(renamed_path(dft1)), "</p>"
	print "<h4>Alignment Algorithms</h4>"
	print "<p>Global Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in needleman_wunsch(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Global Alignment (DFT):</p>", '\n '.join(["<p class='alignment'>" + str(i) + "</p>" for i in needleman_wunsch(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<p>Local Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in local_alignment(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Local Alignment (DFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in local_alignment(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<p>Semiglobal Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in semiglobal_alignment(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Semiglobal Alignment (DFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in semiglobal_alignment(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<h4>Equality Identified</h4>"
	identify_equality(graph0, graph1, LOW)
	print "<br>"
	print "<h4>Differences Identified (from Pathway 1 to Pathway 2)</h4>"
	identify_differences(graph0, graph1, FULL)
	print "<br>"
	print "<h4>Differences Identified (from Pathway 2 to Pathway 1)</h4>"
	identify_differences(graph1, graph0, FULL)


#Algorithm 2
def metabolic_pathways_HTML_alg2(pathway0, pathway1):
	# graph creation
	graph0 = to_graph_from_dict(pathway0)
	graph1 = to_graph_from_dict(pathway1)


	print "Graph 1"
	for n,i in zip(range(len(graph0.get_nodes())),graph0.get_nodes()):
		print n," - ",i.get_value()
	start0 = input("Start Node Graph 1: ")
	print ""

	print "Graph 2"
	for n,i in zip(range(len(graph1.get_nodes())),graph1.get_nodes()):
		print n," - ",i.get_value()

	start1 = (input("Start Node Graph 2: "))

	bft0 = graph0.breadth_first_traversal(start0)
	dft0 = graph0.depth_first_traversal(start0)
	add_to_dictionary(bft0)
	add_to_dictionary(dft0)
	bft1 = graph1.breadth_first_traversal(start1)
	dft1 = graph1.depth_first_traversal(start1)
	add_to_dictionary(bft1)
	add_to_dictionary(dft1)



	# Full Detail Output
	redirectOut()
	print "<h4>Full Detail Output</h4>"
	print "<p>Breadth First Traversal (BFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(bft0), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(bft1), "</p>"
	print '<br>'
	print "<p>Depth First Traversal (DFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(dft0), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(dft1), "</p>"
	print "<br>"
	show_dictionary()
	# Low Detail Output
	print "<h4>Low Detail Output</h4>"
	print "<p>Breadth First Search (BFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(renamed_path(bft0)), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(renamed_path(bft1)), "</p>"
	print "<br>"
	print "<p>Depth First Search (DFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(renamed_path(dft0)), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(renamed_path(dft1)), "</p>"
	print "<h4>Alignment Algorithms</h4>"
	print "<p>Global Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in needleman_wunsch(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Global Alignment (DFT):</p>", '\n '.join(["<p class='alignment'>" + str(i) + "</p>" for i in needleman_wunsch(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<p>Local Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in local_alignment(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Local Alignment (DFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in local_alignment(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<p>Semiglobal Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in semiglobal_alignment(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Semiglobal Alignment (DFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in semiglobal_alignment(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<h4>Equality Identified</h4>"
	identify_equality(graph0, graph1, LOW)
	print "<br>"
	print "<h4>Differences Identified (from Pathway 1 to Pathway 2)</h4>"
	identify_differences(graph0, graph1, FULL)
	print "<br>"
	print "<h4>Differences Identified (from Pathway 2 to Pathway 1)</h4>"
	identify_differences(graph1, graph0, FULL)






#Algorithm 3
def metabolic_pathways_HTML_alg3(pathway0, pathway1):
	# graph creation
	graph0 = to_graph_from_dict(pathway0)
	graph1 = to_graph_from_dict(pathway1)


	print "Graph 1"
	for n,i in zip(range(len(graph0.get_nodes())),graph0.get_nodes()):
		print n," - ",i.get_value()
	start0 = input("Start Node Graph 1: ")
	end0 = input("End Node Graph 1: ")
	print ""

	print "Graph 2"
	for n,i in zip(range(len(graph1.get_nodes())),graph1.get_nodes()):
		print n," - ",i.get_value()

	start1 = (input("Start Node Graph 2: "))
	end1 = (input("End Node Graph 2: "))


	bft0 = graph0.breadth_first_traversal(start0,end0)
	dft0 = graph0.depth_first_traversal(start0,end0)
	add_to_dictionary(bft0)
	add_to_dictionary(dft0)
	bft1 = graph1.breadth_first_traversal(start1,end1)
	dft1 = graph1.depth_first_traversal(start1,end1)
	add_to_dictionary(bft1)
	add_to_dictionary(dft1)



	# Full Detail Output
	redirectOut()
	print "<h4>Full Detail Output</h4>"
	print "<p>Breadth First Traversal (BFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(bft0), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(bft1), "</p>"
	print '<br>'
	print "<p>Depth First Traversal (DFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(dft0), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(dft1), "</p>"
	print "<br>"
	show_dictionary()
	# Low Detail Output
	print "<h4>Low Detail Output</h4>"
	print "<p>Breadth First Search (BFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(renamed_path(bft0)), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(renamed_path(bft1)), "</p>"
	print "<br>"
	print "<p>Depth First Search (DFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(renamed_path(dft0)), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(renamed_path(dft1)), "</p>"
	print "<h4>Alignment Algorithms</h4>"
	print "<p>Global Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in needleman_wunsch(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Global Alignment (DFT):</p>", '\n '.join(["<p class='alignment'>" + str(i) + "</p>" for i in needleman_wunsch(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<p>Local Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in local_alignment(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Local Alignment (DFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in local_alignment(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<p>Semiglobal Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in semiglobal_alignment(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Semiglobal Alignment (DFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in semiglobal_alignment(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<h4>Equality Identified</h4>"
	identify_equality(graph0, graph1, LOW)
	print "<br>"
	print "<h4>Differences Identified (from Pathway 1 to Pathway 2)</h4>"
	identify_differences(graph0, graph1, FULL)
	print "<br>"
	print "<h4>Differences Identified (from Pathway 2 to Pathway 1)</h4>"
	identify_differences(graph1, graph0, FULL)



#Algorithm 4
def metabolic_pathways_HTML_alg4(pathway0, pathway1):
	# graph creation
	graph0 = to_graph_from_dict(pathway0)
	graph1 = to_graph_from_dict(pathway1)


	print "Graph 1"
	for n,i in zip(range(len(graph0.get_nodes())),graph0.get_nodes()):
		print n," - ",i.get_value()
	start0 = input("Start Node Graph 1: ")
	end0 = input("End Node Graph 1: ")
	print ""

	print "Graph 2"
	for n,i in zip(range(len(graph1.get_nodes())),graph1.get_nodes()):
		print n," - ",i.get_value()

	start1 = (input("Start Node Graph 2: "))
	end1 = (input("End Node Graph 2: "))
	n = int(input("Maximum cycles: "))
	paths0 = graph0.get_cyclic_paths(graph0[start0],graph0[end0], [], n)
	paths1 = graph1.get_cyclic_paths(graph1[start1],graph1[end1], [], n)

	if(len(paths0)==0):
		print "Not avaliable paths for graph 0"
		return
	if(len(paths1)==0):
		print "Not avaliable paths for graph 1"
		return

	print "Paths Graph 0:"
	for n,i in zip(range(len(paths0)),paths0):
		out = ""
		for node in i:
			out+=str(node.get_value())+"->"
		out = out[0:-2]
		print n," - ",out

	selected_Path0 = input("Select Path of graph 0: ")
	print ""
	print "Paths Graph 1:"
	for n,i in zip(range(len(paths1)),paths1):
		out = ""
		for node in i:
			out+=str(node.get_value())+"->"
		out = out[0:-2]
		print n," - ",out

	selected_Path1 = input("Select Path of graph 1: ")

	bft0 = graph0.breadth_first_traversal(selected_Path0)
	dft0 = graph0.depth_first_traversal(selected_Path0)
	add_to_dictionary(bft0)
	add_to_dictionary(dft0)
	bft1 = graph1.breadth_first_traversal(selected_Path1)
	dft1 = graph1.depth_first_traversal(selected_Path1)
	add_to_dictionary(bft1)
	add_to_dictionary(dft1)



	# Full Detail Output
	redirectOut()
	print "<h4>Full Detail Output</h4>"
	print "<p>Breadth First Traversal (BFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(bft0), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(bft1), "</p>"
	print '<br>'
	print "<p>Depth First Traversal (DFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(dft0), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(dft1), "</p>"
	print "<br>"
	show_dictionary()
	# Low Detail Output
	print "<h4>Low Detail Output</h4>"
	print "<p>Breadth First Search (BFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(renamed_path(bft0)), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(renamed_path(bft1)), "</p>"
	print "<br>"
	print "<p>Depth First Search (DFT)</p>"
	print "<p class='pathway'>Pathway 1: ", ' '.join(renamed_path(dft0)), "</p>"
	print "<p class='pathway'>Pathway 2: ", ' '.join(renamed_path(dft1)), "</p>"
	print "<h4>Alignment Algorithms</h4>"
	print "<p>Global Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in needleman_wunsch(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Global Alignment (DFT):</p>", '\n '.join(["<p class='alignment'>" + str(i) + "</p>" for i in needleman_wunsch(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<p>Local Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in local_alignment(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Local Alignment (DFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in local_alignment(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<p>Semiglobal Alignment (BFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in semiglobal_alignment(renamed_path(bft0), renamed_path(bft1))])
	print "<p>Semiglobal Alignment (DFT):</p>", '\n'.join(["<p class='alignment'>" + str(i) + "</p>" for i in semiglobal_alignment(renamed_path(dft0), renamed_path(dft1))])
	print "<br>"
	print "<h4>Equality Identified</h4>"
	identify_equality(graph0, graph1, LOW)
	print "<br>"
	print "<h4>Differences Identified (from Pathway 1 to Pathway 2)</h4>"
	identify_differences(graph0, graph1, FULL)
	print "<br>"
	print "<h4>Differences Identified (from Pathway 2 to Pathway 1)</h4>"
	identify_differences(graph1, graph0, FULL)

if __name__ == '__main__':
	if True:
		filePath = "C:\\Users\\Lenovo\\Desktop\\TEC\\Rutas\\hsa00030.xml"
		myKGMLStart = SimpleKGML(filePath)
		myKGML = SimpleKGML(filePath)
		pathway0 = myKGML.getCompoundsGraph()
		pathway0start = myKGMLStart.getWithCentralNodeAsString()
		filePath = "C:\\Users\\Lenovo\\Desktop\\TEC\\Rutas\\bpa00030.xml"
		myKGML = SimpleKGML(filePath)
		myKGMLStar = SimpleKGML(filePath)
		pathway1 = myKGML.getCompoundsGraph()
		pathway1start = myKGMLStar.getWithCentralNodeAsString()
		#metabolic_pathways_HTML(pathway0, pathway1)
		while True:
			print "Menu"
			for i in map(lambda x: x + 1, range(4)):
				print i,"-","Algorithm",i
			i = input("Option: ")
			if(i==1):
				metabolic_pathways_HTML_alg1(pathway0start, pathway1start)
			if(i==2):
				metabolic_pathways_HTML_alg2(pathway0, pathway1)
			if(i==3):
				metabolic_pathways_HTML_alg3(pathway0, pathway1)
			if(i==4):
				metabolic_pathways_HTML_alg4(pathway0, pathway1)
			restoreOut()

	else:
		print("Incorrect number of parameters.")
		print("Expected: <path/KGML.xml>")

SK0 = SimpleKGML("C:\\Users\\Lenovo\\Desktop\\TEC\\Rutas\\hsa00030.xml")
G0  = SK0.getCompoundsGraph()
SK1 = SimpleKGML("C:\\Users\\Lenovo\\Desktop\\TEC\\Rutas\\bap00030.xml")
G1  = SK1.getCompoundsGraph()
metabolic_pathways_HTML_alg4(G0, G1)
