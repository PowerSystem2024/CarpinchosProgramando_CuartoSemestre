# Dar formato a un String
nombre = 'Ana'
edad = 20
# Los parámetros se llaman parámetros posicionales
mensaje_con_formato = 'Mi nombre es %s y tengo %d años' % (nombre, edad)
# print(mensaje_con_formato)

# Definición de una Tupla
persona = ('Wanda', 'Lanatta', 5000.00)
mensaje_con_formato = 'Hola %s %s. Tu sueldo es de $%.2f' # % persona # Aquí pasamos el objeto que es tupla
# print(mensaje_con_formato % persona)

# Método .format()
nombre = 'Mercedes'
edad = 37
sueldo = 3000
# mensaje_con_formato = 'Nombre: {}, edad: {}, sueldo: {:.2f}'.format(nombre, edad, sueldo)
# print(mensaje_con_formato)
'''
mensaje = 'Nombre: {0}, edad {1}, sueldo ${2:.2f}'.format(nombre, edad, sueldo)
print(mensaje)

mensaje = 'Nombre: {1}, edad {2}, sueldo ${0}'.format(nombre, edad, sueldo)
print(mensaje)

mensaje = 'Sueldo ${2:.2f}, edad: {1}, nombre: {0}'.format(nombre, edad, sueldo)
print(mensaje)

mensaje = 'Sueldo ${}, edad: {}, nombre: {}'.format(nombre, edad, sueldo)
print(mensaje)
'''
mensaje = 'Nombre {n}, edad {e}, sueldo: ${s:.2f}'.format(n = nombre, e = edad, s = sueldo)
# print(mensaje)

# Diccionario
diccionario = {'nombre': 'Nicolás', 'edad': 21, 'sueldo': 8000.00}
mensaje = 'Nombre: {dic[nombre]}, edad: {dic[edad]}, sueldo: ${dic[sueldo]:.2f}'.format(dic = diccionario)
print(mensaje)
