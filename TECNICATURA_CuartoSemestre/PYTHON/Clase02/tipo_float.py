# Profundización en el tipo float
a = 3.0
print(f'a = {a:.2f}')

# Constructor de tipo float. Puede recibir int, str, float, bool

a = float(10) # Le pasamos un tipo entero
print(f'a = {a:.2f}')

a = float('10') # Le pasamos un tipo string para convertir siempre que sea un valor numerico
print(f'a = {a:.2f}')

print("\nNotacion exponencial (valores positivos o negativos)")
a = 3e5  # 3 exponencial 5, es decir 3 * 10^5
print(f"Positivo: a = {a:.2f}")

a = 3e-5  # 3 exponencial -5, es decir 3 * 10^-5
print(f"Negativo: a = {a:.5f}\n")

# Toda variable o literal que se utilice en una expresión donde se involucre un float, automáticamente se convierte a float

a = 4.0 + 5
print(f"a = {a}")
print(type(a))