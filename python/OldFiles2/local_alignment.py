from OldFiles.global_alignment import *
import numpy as np
MISMATCH = -1
MATCH = 1
GAP = -2
def fill_matrix(sequence1, sequence2):
     sequence1 = insert_gap(sequence1, 0)
     sequence2 = insert_gap(sequence2, 0)

    #  print(sequence1)
    #  print(sequence2)

     num_rows = len(matrix)
     for i in range(1,num_rows):
         num_cols = len(matrix[i])
         for j in range(1, num_cols):
             up = matrix[i-1][j] + GAP
             left = matrix[i][j-1] + GAP
             diagonal = matrix[i-1][j-1] + getScore(sequence1, sequence2, i, j)

             matrix[i][j] = max(up, left, diagonal, 0)

# CONSTRUYE EL ALINEAMIENTO OPTIMO CON LOS PUNTAJES DE LA MATRIZ
def traceback(sequence1, sequence2):
    alignments = []
    alignmentA = ""
    alignmentB = ""

    print(matrix)

    argmax = np.where(matrix == np.matrix(matrix).max())
    i = argmax[0][0]
    j = argmax[1][0]

    while((i>0 or j>0) and matrix[i][j] != 0):
        if(i>0 and j>0 and matrix[i][j] == matrix[i-1][j-1] + getScore(sequence1, sequence2, i, j)):
            alignmentA = sequence1[j] + alignmentA
            alignmentB = sequence2[i] + alignmentB
            matrix[i][j] = 'D'+str(matrix[i][j]) #CAMINO
            i = i-1
            j = j-1
        elif(i>0 and matrix[i][j] == matrix[i-1][j] + GAP):
            alignmentA = "--" + alignmentA
            alignmentB = sequence2[i] + alignmentB
            matrix[i][j] = "A" + str(matrix[i][j]) #CAMINO
            i = i-1
        else:
            alignmentA = sequence1[j] + alignmentA
            alignmentB = "--" + alignmentB
            matrix[i][j] = "I"+str(matrix[i][j]) #CAMINO
            j = j-1

    alignments.append(alignmentA)
    alignments.append(alignmentB)

    add_sequences(sequence1, sequence2)

    return alignments

# EJECUTA EL ALGORITMO COMPLETO
def local_alignment(sequence1, sequence2):
	clean_matrix()
	init_matrix(sequence1, sequence2) # INICIALIZA LA MATRIZ DE PUNTAJES CON CEROS
	fill_matrix(sequence1, sequence2) # CALCULA TODOS LOS PUNTAJES
	alignments = traceback(["--"]+sequence1,["--"]+sequence2) # OBTIENE EL ALINEAMIENTO OPTIMO
	alignments.insert(0, alignmentScore(alignments[0], alignments[1]))
	return alignments
