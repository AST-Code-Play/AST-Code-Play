## 1. Cambio solicitado 

Implementar un contador de horas de juego, el cual no debe ser manipulado por el jugador solamente por el desarrollador.

## 2. Nuevas historias de usuario 

 ### US-01: Sistema de reconocimiento 

Como usuario, 
quiero obtener reconocimiento del tiempo invertido, 
para incentivar la lealtad del juego.

Criterios de aceptación:

- CA1: Dado que el contador de horas esta activo, cuando el valor alcanza un tiempo determinado, entonces el sistema debe marcar el logro como "completado" internamente.
- CA2: Dado que el tiempo es controlado por el desarrollador, cuando se intenta modificar manualmente el archivo de guardado, entonces el sistema debe validar para evitar fraudes en las recompensas.

### US-02: Retención de usuario.

Como desarrollador, 
quiero implementar un contador de tiempo de juego persistente, 
para analizar la retención del usuario.

Criterios de aceptación:

- CA1: Dado que el jugador abre el menú de pausa, cuando la acción de juego se detiene, entonces el contador debe suspenderse inmediatamente para no inflar las estadísticas.
- CA2: Dado que el jugador cierra la aplicación, cuando se detecta el evento de cierre, entonces el sistema debe guardar el tiempo acumulado.

## 3. Impacto en requisitos extrafuncionales 

Indicar si el cambio altera la prioridad de algún REF o introduce nuevos. 
Trazar cambios de prioridad que motiven cambios en decisiones de arquitectura. 

| REF ID | Descripción                    | Prioridad anterior | Prioridad nueva | Cambio / Motivo           | 
|--------|--------------------------------|--------------------|-----------------|---------------------------| 
| REF-01 | Eficiencia                  | Alta               | Alta            | Sin cambio                | 
| REF-02 | Fiabilidad / Disponibilidad  | Media               | Media            | Sin cambio              | 
| REF-03 | Seguridad                  | Media              | Alta            | El cambio lo hace crítico | 
| REF-04 | Compatibilidad  | Media               | Media            | Sin cambio              | 
| REF-05 | Aforo / Soporte | Media               | Media            | Sin cambio              | 
| REF-06 | Recuperabilidad | Baja                  | Alta            | El cambio lo hace crítico   | 
| REF-07 | Capacidad de interacción  | Baja               | Baja            | Sin cambio              | 
| REF-08 | Calidad de rendimiento | Alta                  | Alta            | Sin cambio           | 
| REF-09 | Mantenibilidad | Alta                 | Media            | El requisito se va dirigido al cambio  | 
| REF-10 | Testabilidad | Media | Alta            | El cambio lo hace crítico           | 
 

## 4. Impacto en entidades del dominio 

- Como la nueva implementacion del contador de tiempo no afecta a las entidades de dominios, no se modificara este apartado.
 

## 5. Impacto en mockups 

- No tenemos las herramientas para implementar mockups, pues no se a realizado la modificacion como tal. 

 
## 6. Impacto en arquitectura 

### 6.1 ¿Cambia el estilo arquitectónico? 

No cambia, ya que se mantiene el formato de capas (3), ya que el contador viviría en la capa de servicios, se mostraría en la capa de presentación y se almacenaría de forma segura en la capa de datos.

### 6.2 Relación REF (repriorizado) con decisiones de arquitectura 

| REF ID | Prioridad nueva | Decisión de arquitectura que lo aborda         | 
|--------|-----------------|------------------------------------------------| 
| REF-01 | Alta            | El sistema debe respoder en menos de 2 segundos.  | 
| REF-03 | Alta            | Se necesita evitar fraudes en el sistema de recompensas.    | 
| REF-06 | Alta            | Resguardar y proteger los datos que se necesitan almacenar.   | 
| REF-08 | Alta            | El contador no debe afectar en el rendimiento del juego.  | 
| REF-10 | Alta            | El contador se debe adaptar bien a lo ya previamente establecido.        | 

## 7. Impacto en módulos 

| Módulo             | Tipo de impacto    | Responsabilidad actualizada        |
|--------------------|--------------------|------------------------------------|
| Capa de presentación | Modificado         | HUD       | 
| Capa de lógica del juego    | Modificado      | Datos del contador               |
| Capa de datos | Modificado    | Almacenamiento        |


Fundamentación de cambios modulares: 

- Este contador viviría en la Capa de lógica del juego (Service Layer), se mostraría en la Capa de Presentación y se almacenaría de forma segura en la Capa de Datos (Data Layer).

## 8. Nuevas decisiones de diseño 

### Decisión 1 

- Decisión: Crear un nuevo contador de tiempo de el videojuego.

- Motivación: Para tener un mayor control del usuario en sus horas de juego, referenciando REF repriorizado si aplica.

- Alternativas consideradas: Nuestro equipo intento realizarlo mediante pagina web, para mayor comodidad se realizara de manera online.

- Impacto: REF 08 puede afectar el rendimineto en el disposito en el que se juega porque necesita procesar y evaluar datos al mismo tiempo que se esta ejecutando el juego.

 
## 9. Trazabilidad actualizada 

 
| Historia | REF relacionado | Módulo     | Mockup  | 
|----------|-----------------|------------|---------| 
| US-01    | REF-06 (Recuperabilidad) | [módulo]   | [ref]   | 
| US-02    | REF-03 (Seguridad)       | [módulo]   | [ref]   | 
 

## 10. Justificación global y trade-offs 

La solución propuesta es coherente con la arquitectura ya hecha, debido a que esta ya posee un hud en la capa de presentacion del juego donde mostrar el contador, el cual se almacenara en la capa de datos junto a los datos de usuario, mientras que en la capa logica del juego en control del jugador se debe sumar y guardar el tiempo de sesión. Los trade-offs que se asumen son que ahora el control del jugador debe realizar dos trabajos a la vez o cual creara un mayor acoplamiento
