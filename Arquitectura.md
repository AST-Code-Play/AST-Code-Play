## 1. Estilo Arquitectónico 

Estilo adoptado: Capas (layered)

Justificación basada en REF priorizados: 

| REF ID | Descripción                              | Prioridad | Cómo lo aborda el estilo      | 
|--------|------------------------------------------|-----------|-------------------------------| 
| REF-01 | El sistema debe responder en menos de 2 seg | Alta      | [explicación]                 | 
| REF-02 | los juegos no presentan problemas tecnicos  | Alta      | [explicación]                 | 
| REF-03 | El producto recibe actualizaciones constantes | Alta      | [explicación]                 | 
| REF-04 | Todos los modulos del sistema fincionan correctamente | Alta      | [explicación]                 | 


Explicación textual: Se escogio el estilo de 4 capas ya que permite dividir el motor del juego 
(main menu, HUD y configuracion) de la logica del juego (reglas del sigilo, deteccion, timing, IA, control del jugador)
y de la capa de datos ( datos del usuario, guardado de partidas, configuracion personalizada)

Este estilo es bastante util al desarrollarlo, Como es un juego basado en el desafío técnico, si quieres cambiar cómo funciona la "visión" o el
"hitbox", solo modificas la capa de lógica sin romper el sistema de guardado o la interfaz.



## 2. Diagrama de Arquitectura 

[Insertar diagrama que muestre el estilo y los módulos. 
Ejemplo: ![Diagrama de Arquitectura](./diagrama_arquitectura.png)] 

## 3. Descomposición Modular 
Fundamentación: [Criterio de descomposición: por dominio, capa, funcionalidad, etc.] 

 
