# Documentación del Proyecto

Este proyecto configura un entorno de desarrollo y producción para una aplicación Node.js/GraphQL utilizando Docker y Docker Compose. A continuación, se detallan los componentes y configuraciones involucradas en el proyecto.

## Dockerfile

El `Dockerfile` define cómo construir la imagen Docker para la aplicación Node.js/GraphQL.

### Pasos del Dockerfile

1. **Usa una imagen base de Node.js**
   - Se usa la imagen `node:18.14.1` como base.

2. **Establece el directorio de trabajo**
   - Se define `/app` como el directorio de trabajo dentro del contenedor.

3. **Copia los archivos de configuración**
   - Se copian `package.json` y `package-lock.json` al directorio de trabajo.

4. **Instala las dependencias**
   - Se ejecuta `npm install` para instalar las dependencias definidas en `package.json`.

5. **Copia el código de la aplicación**
   - Se copia todo el código de la aplicación al directorio de trabajo dentro del contenedor.

6. **Expone el puerto de la aplicación**
   - Se expone el puerto `4000` en el contenedor.

7. **Define el comando para ejecutar la aplicación**
   - Se define `npm start` como el comando que se ejecutará al iniciar el contenedor.

## docker-compose.yaml

El archivo `docker-compose.yaml` define los servicios necesarios para ejecutar la aplicación, gestionando la creación y configuración de los contenedores.

### Servicios

- **Contenedor de la aplicación GraphQL**
  - **Nombre del contenedor**: `graphql_container`
  - **Construcción**: Usa el `Dockerfile` para construir la imagen.
  - **Puertos**: Mapea el puerto `4000` del contenedor al puerto `4000` de la máquina anfitriona.
  - **Dependencias**: Depende del servicio `mongodb`.
  - **Red**: Conectado a `app-network`.
  - **Variables de entorno**: Cargadas desde el archivo `.env`.

- **Contenedor de MongoDB**
  - **Nombre del contenedor**: `mongodb_container`
  - **Imagen**: Usa la imagen oficial de MongoDB (`mongo:latest`).
  - **Puertos**: Mapea el puerto `27017` del contenedor al puerto `27017` de la máquina anfitriona.
  - **Volúmenes**: Usa el volumen `mongodb_data` para persistir los datos.
  - **Red**: Conectado a `app-network`.

### Redes y Volúmenes

- **Redes**
  - **app-network**: Define una red `bridge` para la comunicación entre los contenedores.

- **Volúmenes**
  - **mongodb_data**: Define un volumen para la persistencia de datos de MongoDB.

## Representación Visual

Este diagrama representa la estructura y la interacción entre los contenedores de la aplicación y MongoDB en el entorno de Docker.

![Diagrama de Docker](diagramasAppDistribuidas/Socket.png)
