# DJQ MOTORS - Concesionario Virtual de Motocicletas 🚀

Este proyecto es una simulación avanzada de una tienda virtual de motocicletas, especializada en las marcas **BMW**, **Yamaha**, y **Honda**. El objetivo es mostrar un catálogo completo con información detallada y ofrecer funcionalidades clave de un eCommerce como financiación y carrito de compras, todo con un diseño limpio y moderno.

##  Características y Funcionalidades

El proyecto incluye las siguientes secciones y características interactivas:

### Páginas Principales
* **Inicio (`DJQ MOTORS.html`):** Portal principal de bienvenida.
* **Marcas (BMW, Yamaha, Honda):** Tres páginas dedicadas, cada una con su identidad visual, un catálogo de **6 motocicletas** e información específica de la marca.
* **Financiamiento (`financiar.html`):** Sección para calcular planes de pago de las motos.
* **Información / Servicios (`informacion.html`):** Detalles sobre servicios, trámites o noticias de las marcas.

### Interactividad (JavaScript)
* **Sistema de Carrito de Compras:** Funcionalidad para añadir, ver y gestionar los productos seleccionados.
* **Cálculos de Financiación:** Implementación de lógica JS para simular planes de pago (cuotas, intereses, etc.).
* **Login y Sesión de Usuario:** Módulos para simular el inicio y cierre de sesión.
* **Validación de Formularios:** Scripts para asegurar que los datos ingresados en el **formulario de contacto** y el **login** sean correctos antes de ser procesados.
* **Generación de PDF:** Uso de la librería `jspdf` (referenciada en el HTML) para generar documentos de resumen (por ejemplo, cotizaciones o resumen del carrito).

### Estilo y Diseño
* **Diseño Responsivo Total:** Uso de **Media Queries** personalizadas en cada CSS para garantizar la adaptabilidad perfecta en móviles, tabletas y escritorios.
* **Framework CSS:** Implementación del framework **Picnic CSS** para la estructura, el grid y componentes básicos, lo que facilita un diseño ligero y modular.
* **Estilos Personalizados:** Archivos CSS dedicados (`bmw.css`, `Yamaha.css`, `honda.css`) para capturar la esencia visual de cada marca.
* **Contenido Multimedia:** Uso de videos de fondo en el encabezado (`<video loop autoplay muted>`) para un impacto visual dinámico.

##  Tecnologías y Librerías

| Categoría | Tecnología/Librería | Propósito |
| :--- | :--- | :--- |
| **Estructura** | HTML5 | Base de todo el contenido y las páginas. |
| **Estilos Base** | Picnic CSS | Framework ligero para la grilla y estilos de componentes (botones, formularios). |
| **Estilos Específicos** | CSS3 (Puro) | Estilos de marca, diseño de galería de motos, y la implementación de **Media Queries**. |
| **Interactividad** | JavaScript | Lógica de negocio (carrito, login, validación al ingresar). |
| **Documentos** | jspdf.js | Generación de PDFs para cotizaciones. |

