## 1. Estilo Arquitectónico 

Estilo adoptado: Capas (layered)

Justificación basada en REF priorizados: 

| REF ID | Descripción                              | Prioridad | Cómo lo aborda el estilo      | 
|--------|------------------------------------------|-----------|-------------------------------| 
| REF-01 | El sistema debe responder en menos de 2 seg | Alta      | El tiempo de demora entre capas no debe superar los 2 seg, para garantizar fluidez en el juego | 
| REF-02 | los juegos no presentan problemas tecnicos  | Alta      | El estilo nos permite verificar los posibles problemas tecnicos desglozados| 
| REF-03 | El producto recibe actualizaciones constantes | Alta      | Al ser de capas es mas facil subir actualizaciones sin interferir en las demas capas| 


Explicación textual: Se escogio el estilo de 3 capas ya que permite dividir el motor del juego 
(main menu, HUD y configuracion) de la logica del juego (reglas del sigilo, deteccion, timing, IA, control del jugador)
y de la capa de datos ( datos del usuario, guardado de partidas, configuracion personalizada)

Este estilo es bastante util al desarrollarlo, Como es un juego basado en el desafío técnico, si quieres cambiar cómo funciona la "visión" o el
"hitbox", solo modificas la capa de lógica sin romper el sistema de guardado o la interfaz.



## 2. Diagrama de Arquitectura 

![Diagrama](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/blob/main/Diagrama.png)

## 3. Descomposición Modular 
Fundamentación: [Criterio de descomposición: por dominio, capa, funcionalidad, etc.] 

**Capa de Presentación**

La capa de presentación corresponde a la parte del sistema con la que el usuario interactúa directamente. Su función principal es mostrar información al jugador y permitir la interacción con el sistema.

Dentro de esta capa se incluyen los siguientes módulos:

- Menú principal: Es la interfaz inicial del juego, donde el usuario puede comenzar una partida, cargar un juego previamente guardado o acceder a otras opciones.
- HUD (Head-Up Display): Corresponde a la interfaz visible durante el juego, donde se muestra información relevante como la vida del personaje, puntaje, mapa, inventario, entre otros elementos.
- Configuración: Permite al usuario modificar opciones del juego, como el sonido, los gráficos o los controles.

**Capa de Lógica del Juego**

La capa de lógica del juego es el núcleo del sistema, ya que se encarga de procesar todas las reglas, comportamientos y mecánicas del videojuego.

Los módulos que la componen son:

- Control del jugador: Gestiona las acciones del jugador, como moverse, saltar, atacar o interactuar con el entorno.
- IA de enemigos: Define el comportamiento de los enemigos dentro del juego, incluyendo sus movimientos, decisiones y reacciones frente al jugador.
- Sistema de sigilo (detección, visión): Se encarga de determinar si el jugador es detectado por los enemigos, considerando factores como la distancia, el campo de visión.

**Capa de Datos**

La capa de datos tiene como función almacenar y gestionar la información necesaria para el funcionamiento del sistema. Esta información puede ser utilizada tanto por la capa de presentación como por la capa de lógica.

Incluye los siguientes módulos:

- Configuración: Guarda las preferencias del usuario, como ajustes de audio, video y controles.
- Guardado de partidas: Permite almacenar el progreso del jugador, incluyendo niveles completados y estado del personaje.
- Datos de usuario: Contiene información del perfil del jugador, como nombre, estadísticas o historial de juego.
 
 
