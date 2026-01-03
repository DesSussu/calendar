
# Proyecto: Calendario de Eventos Anual

## Visión General

Una aplicación de calendario de eventos interactiva y persistente. La aplicación permite a los usuarios añadir, ver, editar y eliminar eventos en un calendario anual. El diseño es moderno, limpio y totalmente responsivo. Los eventos se guardan en el `localStorage` del navegador, por lo que persisten entre sesiones.

## Diseño y Estilo

*   **Paleta de Colores:**
    *   Primario: Azul (`#007bff`)
    *   Acento: Rosa (`#ff4081`)
    *   Fondo: Gris claro (`#f9f9f9`)
    *   Texto: Oscuro (`#333333`) y claro (`#ffffff`)
*   **Tipografía:** Se utiliza la fuente 'Roboto' para una apariencia limpia y moderna.
*   **Layout:** Un diseño de doble panel, con el calendario a la izquierda y la lista de eventos del día seleccionado a la derecha. El diseño es responsivo y se adapta a pantallas de todos los tamaños.
*   **Iconografía:** Se utilizan iconos de Material Design para acciones como añadir eventos y navegar entre años.
*   **Efectos:** Sombras suaves para dar profundidad, y sutiles transiciones de `hover` para una mejor experiencia de usuario.

## Fases de Desarrollo

### Fase 1: Estructura del Proyecto y Componentes Base

*   **Objetivo:** Crear la estructura inicial del proyecto y los componentes fundamentales.
*   **Pasos:**
    1.  **Limpieza del proyecto:** Se eliminaron los archivos de la aplicación por defecto.
    2.  **Creación de `AppComponent`:** Sirve como contenedor principal de la aplicación.
    3.  **Generación de `CalendarComponent`:** El componente principal que muestra el calendario anual.
    4.  **Lógica del calendario:** Se implementó la lógica para generar la cuadrícula de días para cada mes del año.

### Fase 2: CRUD de Eventos y Servicios

*   **Objetivo:** Implementar la funcionalidad completa de Crear, Leer, Actualizar y Eliminar (CRUD) para los eventos.
*   **Pasos:**
    1.  **Creación de `EventsService`:** Un servicio para gestionar el estado de los eventos de forma centralizada utilizando señales de Angular.
    2.  **`EventFormComponent`:** Se creó un formulario para añadir y editar eventos.
    3.  **`EventListComponent`:** Un componente para mostrar la lista de eventos de un día seleccionado.
    4.  **`ConfirmationDialogComponent`:** Un diálogo de confirmación para eliminar eventos de forma segura.
    5.  **Integración con `MatDialog`:** Se utilizó el servicio `MatDialog` de Angular Material para abrir los formularios y diálogos.

### Fase 3: Interfaz de Usuario y Experiencia de Usuario (UI/UX)

*   **Objetivo:** Mejorar la interactividad y la experiencia visual de la aplicación.
*   **Pasos:**
    1.  **Selección de día:** Se implementó la lógica para que el usuario pueda seleccionar un día y ver los eventos correspondientes.
    2.  **Indicadores de eventos:** Se añadieron indicadores visuales en los días que tienen eventos.
    3.  **Animaciones:** Se incorporaron animaciones para la aparición y desaparición de la lista de eventos.

### Fase 4: Estilos y Diseño Visual

*   **Objetivo:** Aplicar un diseño visual coherente y atractivo.
*   **Pasos:**
    1.  **Tematización:** Se creó un fichero `theme.scss` con variables para la paleta de colores, tipografía y sombras.
    2.  **Estilos de componentes:** Se aplicaron los estilos del tema a todos los componentes de la aplicación.

### Fase 5: Persistencia de Datos y Modo Offline

*   **Objetivo:** Guardar los eventos del usuario para que persistan entre sesiones.
*   **Pasos:**
    1.  **`localStorage`:** Se modificó el `EventsService` para guardar y cargar eventos desde el `localStorage` del navegador.

### Fase 6: Toques Finales y Despliegue

*   **Objetivo:** Añadir las últimas funcionalidades, realizar una revisión final y desplegar la aplicación.
*   **Pasos:**
    1.  **Navegación por año:** Se añadieron botones para que el usuario pueda navegar entre años.
    2.  **Revisión de accesibilidad (A11Y):** Se revisaron los componentes para asegurar el uso correcto de atributos ARIA.
    3.  **Compilación final:** Se realizó una compilación de producción para asegurar que no hay errores.
    4.  **Despliegue:** La aplicación fue desplegada para ser accesible públicamente.
