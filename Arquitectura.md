## 1. Estilo Arquitectónico 

Estilo adoptado: Capas (layered)

Justificación basada en REF priorizados: 

| REF ID | Descripción                              | Prioridad | Cómo lo aborda el estilo      | 
|--------|------------------------------------------|-----------|-------------------------------| 
| REF-01 | El sistema debe responder en menos de 2 seg | Alta      | El tiempo de demora entre capas no debe superar los 2 seg, para garantizar fluidez en el juego | 
| REF-02 | los juegos no presentan problemas tecnicos  | Alta      | El estilo nos permite verificar los posibles problemas tecnicos desglozados| 
| REF-03 | El producto recibe actualizaciones constantes | Alta      | Al ser de capas es mas facil subir actualizaciones sin interferir en las demas capas| 


Explicación textual: Se escogio el estilo de 4 capas ya que permite dividir el motor del juego 
(main menu, HUD y configuracion) de la logica del juego (reglas del sigilo, deteccion, timing, IA, control del jugador)
y de la capa de datos ( datos del usuario, guardado de partidas, configuracion personalizada)

Este estilo es bastante util al desarrollarlo, Como es un juego basado en el desafío técnico, si quieres cambiar cómo funciona la "visión" o el
"hitbox", solo modificas la capa de lógica sin romper el sistema de guardado o la interfaz.



## 2. Diagrama de Arquitectura 

![Diagrama](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/blob/main/Diagrama.png)

## 3. Descomposición Modular 
Fundamentación: [Criterio de descomposición: por dominio, capa, funcionalidad, etc.] 

 
