<div align="center">
# Gestor de Tareas - API REST
<br>
<img src="https://w7.pngwing.com/pngs/972/511/png-transparent-todo-sketch-note-list-tasks-thumbnail.png" alt="Imagen de ToDo">
<h3>Sistema Web de Gestión de Tareas desarrollado con Spring Boot</h3>

</div>

<h4>Aplicación web desarrollada con HTML, CSS y JavaScript que consume una API REST construida con Java utilizando el ecosistema de Spring Boot</h4>

Este sistema permite crear tareas pendientes, marcarlas como finalizadas y eliminarlas. Los datos se persisten en una base de datos relacional, organizándose por fecha y hora. Toda la funcionalidad se implementa mediante el consumo de endpoints REST proporcionados por el backend. El frontend utiliza JavaScript vanilla para generar elementos dinámicamente, agregar y modificar clases CSS, así como eliminar componentes creados en tiempo de ejecución.

**Gestor de Base de Datos:** MySQL (Sistema Relacional)

**Documentación de API:** Swagger - Herramienta para documentar servicios REST

**Testing de Endpoints:** Postman - Plataforma para probar APIs

## Tecnologías del Backend

### Stack Tecnológico:

* Java Development Kit (JDK) versión 17
* Spring Boot versión 3.0.2

### Librerías y Dependencias:

* spring-boot-starter-web
* spring-boot-starter-test
* spring-boot-starter-data-jpa
* spring-boot-devtools
* mysql-connector-j
* lombok
* jakarta.validation-api
* springdoc-openapi-ui
* hibernate-validator

#### Inicializar un Proyecto Nuevo:

1. Acceder al portal de Spring Initializr: https://start.spring.io/
2. Configurar las dependencias requeridas
3. Generar y descargar el archivo comprimido del proyecto
4. Extraer el contenido del archivo ZIP
5. Importar el proyecto en tu IDE preferido (Eclipse, IntelliJ IDEA, NetBeans, etc.)
6. Incorporar las dependencias adicionales no disponibles en el sitio editando el archivo **pom.xml** (según la lista anterior)

### Instrucciones de Ejecución:

1. Clonar el repositorio desde GitHub
2. Importar el proyecto en tu IDE de preferencia (Eclipse, IntelliJ IDEA, NetBeans, etc.)
3. Crear el archivo "application.yml" en la ruta `src/main/resources/` con la siguiente configuración:

```yaml
spring:
  application:
    name: ToDo API
  datasource:
    url: jdbc:mysql://localhost:3306/db_todo_api?useSSL=false&serverTimezone=UTC
    username: root
    password:
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

server:
  port: 8080
```

**Nota:** Si tu MySQL no tiene contraseña configurada (común en XAMPP), deja el campo `password:` vacío o con comillas vacías `""`.

4. (Opcional) Si prefieres no exponer tus credenciales directamente en el archivo "application.yml", puedes utilizar variables de entorno del sistema operativo:
   * En la barra superior, junto al ícono de compilación (martillo verde), localiza el nombre del proyecto
   * Haz clic y selecciona "Edit Configurations..."
   * En la ventana emergente, busca la sección "Environment variables:" en el panel central
   * Define las variables "DB_USER" y "DB_PASSWORD" con sus respectivos valores
5. La base de datos MySQL llamada "db_todo_api" se generará automáticamente en el primer arranque de la aplicación.
6. (Opcional) Si necesitas gestionar la apertura de puertos: Utiliza un gestor de bases de datos como **XAMPP** para habilitar las conexiones.
7. Ejecutar la aplicación desde el IDE

### Rutas de la API

#### POST

Ruta para crear tareas: http://localhost:8080/api/v1/tasks/create

Estructura JSON requerida en el cuerpo de la petición:

```json
{
    "title": "Tarea 1",
    "date": "2021-10-10",
    "time": "10:00"
}
```

#### GET

Ruta para obtener todas las tareas: http://localhost:8080/api/v1/tasks/all

#### PATCH

Ruta para actualizar el estado de una tarea: http://localhost:8080/api/v1/tasks/mark_as_finished/{id}/{finished}

Donde "id" corresponde al identificador de la tarea a modificar y "finished" es un valor booleano (true o false) que indica el estado de finalización.

#### DELETE

Ruta para eliminar tareas: http://localhost:8080/api/v1/tasks/delete/{id}

Donde "id" corresponde al identificador de la tarea a eliminar.

## Tecnologías del Frontend

El frontend fue desarrollado utilizando HTML5, CSS3 y JavaScript ES6+ sin frameworks externos.
La interfaz es estática pero totalmente responsive, adaptándose a diferentes dispositivos.

### Biblioteca de Componentes UI

Para las alertas, modales y elementos interactivos se utilizó SweetAlert2: https://sweetalert2.github.io/#examples

Los componentes se personalizaron según las necesidades específicas del proyecto, eligiendo los ejemplos más apropiados según los requerimientos de experiencia de usuario.

Servidor de Desarrollo

Se utiliza la extensión Live Server para ejecutar la aplicación en un servidor local. Esta herramienta permite visualizar los cambios en tiempo real al guardar los archivos, sin necesidad de recargar manualmente el navegador.
