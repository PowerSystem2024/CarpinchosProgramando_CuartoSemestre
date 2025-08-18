# Profundizando en los sistemas de numeración
print("\nSistemas de numeracion\n")
# Sistema decimal
a = 10  # La literal 10 es un entero decimal
print(f'a decimal: {a}')

# Sistema binario
a = 0b1010  # 0b es el prefijo para enteros binarios. 1010 es un literal que representa el valor 10 en base 2
print(f'a binario: {a}')

# Sistema octal
a = 0o12  # 0o es el prefijo para enteros octales. 12 es un literal que representa el valor 10 en base 8
print(f'a octal: {a}')

# Sistema hexadecimal
a = 0xA  # 0x es el prefijo para enteros hexadecimales. A es un literal que representa el valor 10 en base 16
print(f'a hexadecimal: {a}')

print("\nConversion con base numerica\n")
# Base decimal
a = int('23', 10) # Convertimos un string a entero en base 10
print(f"a = Base decimal: {a}")

# Base binario
a = int('10111', 2) # Convertimos un string a entero en base 2
print(f"a = Base binario: {a}")

# Base octal
a = int('27', 8) # Convertimos un string a entero en base 8
print(f"a = Base octal: {a}")

# Base hexadecimal
a = int('17', 16) # Convertimos un string a entero en base 16
print(f"a = Base hexadecimal: {a}")

# Base 5 sus valores son de 0 a 4
a = int('344', 5) # Convertimos un string a entero en base 5
print(f"a = Base 5: {a}")
