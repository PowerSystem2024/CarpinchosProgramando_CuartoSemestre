# Manejo de valores infinitos
import math
from decimal import Decimal

infinito_positivo = float('inf')
print(f'Infinito positivo: {infinito_positivo}')
print(f'Es infinito?: {math.isinf(infinito_positivo)}')
print(f'Es un numero?: {math.isfinite(infinito_positivo)}')
print(f'Clase: {type(infinito_positivo)}')
print(math.isinf(-1)) # Imprime un booleano que indica si el valor es infinito o no

infinito_negativo = float('-inf')
print(f'\nInfinito negativo: {infinito_negativo}')
print(f'Es infinito?: {math.isinf(infinito_negativo)}') # isinf devuelve un booleano que indica si el valor es infinito o no
print(f'Clase: {type(infinito_negativo)}')

# Modulo Math
infinito_positivo = math.inf
print(f'\nInfinito positivo: {infinito_positivo}')
print(f'Es infinito?: {math.isinf(infinito_positivo)}') # isinf devuelve un booleano que indica si el valor es infinito o no
print(f'Clase: {type(infinito_positivo)}')
print(math.isinf(-1)) # Imprime un booleano que indica si el valor es infinito o no

infinito_negativo = -math.inf
print(f'\nInfinito negativo: {infinito_negativo}')
print(f'Es infinito?: {math.isinf(infinito_negativo)}') # isinf devuelve un booleano que indica si el valor es infinito o no
print(f'Clase: {type(infinito_negativo)}')

# Modulo Decimal
infinito_positivo = Decimal('Infinity') # La clase Decimal no acepta valores infinitos, por lo que se debe convertir a un string
print(f'\nInfinito positivo: {infinito_positivo}')
print(f'Es infinito?: {math.isinf(infinito_positivo)}')
print(f'Clase: {type(infinito_positivo)}')
print(math.isinf(-1)) # Imprime un booleano que indica si el valor es infinito o no

infinito_negativo = Decimal('-Infinity')
print(f'\nInfinito negativo: {infinito_negativo}')
print(f'Es infinito?: {math.isinf(infinito_negativo)}')
print(f'Clase: {type(infinito_negativo)}')