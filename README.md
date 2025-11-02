# 🛒 LiquiVerde: Plataforma de Optimización de Compras Sostenibles

**LiquiVerde** es una plataforma de *retail* inteligente diseñada para asistir a los consumidores en la toma de **decisiones de compra sostenibles y económicamente eficientes**. El sistema optimiza listas de compra basándose en un enfoque multi-criterio.

---

## ⚙️ 1. Instrucciones Claras para Ejecutar Localmente

Esta guía asume una ejecución local estándar del backend API (sin Docker).

### 1.1. Prerrequisitos

* **Java Development Kit (JDK) 17**.
* **Apache Maven**.
* **Servidor PostgreSQL Local** (corriendo en el puerto por defecto `5432`).

### 1.2. Configuración de la Base de Datos

Debe configurar una base de datos local que coincida con la configuración del proyecto.

1.  **Crear Base de Datos y Usuario:**
    Ejecute los siguientes comandos SQL:
    ```sql
    -- 1. Crear la base de datos
    CREATE DATABASE grupolagos;
    
    -- 2. Crear el usuario (si es necesario) y otorgar permisos
    CREATE USER liquiverde_user WITH PASSWORD 'your_strong_password';
    GRANT ALL PRIVILEGES ON DATABASE grupolagos TO liquiverde_user;
    ```
2.  **Verificación de `application.properties`:**
    Asegúrese de que el archivo **`src/main/resources/application.properties`** contenga las credenciales de conexión local:

    ```properties
    # Credenciales de la Base de Datos
    spring.datasource.url=jdbc:postgresql://localhost:5432/grupolagos
    spring.datasource.username=**USER***
    spring.datasource.password=**YOUR_PASSWORD** 
    # ... otras propiedades
    ```
    ***Importante:*** *Use su contraseña real de PostgreSQL en el archivo.*

### 1.3. Ejecución de la Aplicación

#### Backend
Desde la terminal, dentro de la carpeta raíz del proyecto `LiquiVerde`, ejecuta:
```bash
mvn spring-boot:run
```
#### Frontend
Desde la terminal, dentro de la carpeta del frontend:
```bash
npm install # si es la primera vez que instalas dependencias
```
Luego:
```bash
npm run dev
```
Esto levantará la aplicación frontend en: [http://localhost:5173/](http://localhost:5173/)

---

## 🧠 2. Explicación de Algoritmos Implementados

### 2.1. Algoritmo de Optimización Multi-Criterio (Mochila)

Este algoritmo aborda el problema de la **Mochila Multi-objetivo** para **maximizar la sostenibilidad total** sujeta a una **restricción de presupuesto**.

* **Heurística:** Se utiliza una aproximación **Greedy (Voraz)**, priorizando la eficiencia.
* **Fórmula de Priorización (Ratio de Eficiencia):**

    El sistema clasifica los productos por el **mayor impacto sostenible por cada unidad monetaria gastada**:

    $$
    Ratio\text{ de Eficiencia} = \frac{\text{ScoreTotal}}{\text{Precio}}
    $$

* **Mecanismo (`OptimizacionService.java`):**
    1.  Calcula el *Ratio* para todos los productos de la lista.
    2.  **Ordena la lista de forma descendente** por este *Ratio*.
    3.  Itera sobre la lista ordenada, añadiendo productos solo si el **presupuesto restante** lo permite.

### 2.2. Algoritmo de Sustitución Inteligente

El sistema busca alternativas dentro de la misma categoría.

* **Criterio de Sustitución (`ProductoService.java`):** Una alternativa es válida si es **más sostenible** (mayor `ScoreTotal`) **O** es **más económica** (menor `Precio`) que el producto original.

Alternativa Válida si: ScoreTotal es mayor O Precio es menor.

* **Priorización:** Las alternativas válidas se ordenan de forma descendente basándose en su `ScoreTotal` para promover las opciones más sostenibles.

### 2.3. Configuración de APIs y Variables de Entorno

Se asume que los scores de sostenibilidad se han pre-calculado y almacenado en la tabla `productos`. La integración con APIs externas (como Open Food Facts o Carbon Interface) se realizaría inyectando las URLs y claves mediante variables de entorno como: `OFF_API_URL`, `CARBON_API_KEY`, etc.

### 2.4. Uso de APIs Externas (Open Food Facts)

Aunque se planificó la integración con APIs externas como Open Food Facts, la mayoría de las APIs no estaban disponibles o sus datos eran inválidos.  
Por ejemplo, la consulta:
```bash
https://world.openfoodfacts.org/api/v2/search?countries=chile&categories=food
```
solo devolvía correctamente el nombre de un producto; los demás datos no contenían el nombre ni otros campos necesarios.
Debido a esto, se decidió **realizar las pruebas utilizando datos locales** almacenados en la base de datos del proyecto, es decir, los productos contenidos en **`data.sql`**.

---

## 📦 3. Dataset de Ejemplo con Productos

Se requiere cargar datos en la tabla `productos` para probar la optimización. En el proyecto, dentro de `src/main/resources/` se encuentra un archivo llamado **`data.sql`**, que contiene los datos para rellenar automáticamente la tabla `productos`.  

---

## 🤖 Uso de IA

Durante el desarrollo de **LiquiVerde**, se utilizó Inteligencia Artificial para apoyar en distintas áreas:

### 1. Corrección de errores en el backend
- Se empleó IA para identificar problemas en la lógica del código y sugerir correcciones eficientes.

### 2. Optimización de algoritmos
- La IA ayudó a definir cómo abordar los algoritmos manera más clara y eficiente.

### 3. Mejora de la interfaz de usuario
- Se utilizó IA para orientar el diseño del frontend, asegurando que la plataforma sea **intuitiva, clara y agradable** para los usuarios.
