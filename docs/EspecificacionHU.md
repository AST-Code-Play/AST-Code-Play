# Especificación de Historia de Usuario

## US-02: Tienda de objetos con moneda virtual ganada en partida (Refinamiento de la US-12)

Como jugador activo de la plataforma que ha acumulado moneda virtual mediante partidas completadas,
quiero acceder a una tienda dentro del juego donde pueda gastar dicha moneda para adquirir objetos
(cosméticos, consumibles o de mejora),
para personalizar mi experiencia de juego y sentir que mi progreso en la plataforma tiene
recompensas tangibles que me motiven a seguir participando y aportando feedback a la comunidad.

Esta historia corresponde a una **transacción que une dos o más entidades** (Jugador y Objeto),
según el alcance definido en la pauta de evaluación (sección 5.2).

## Criterios de aceptación

- **CA1 — Compra exitosa con saldo suficiente**
  Dado que el jugador tiene un saldo de moneda virtual igual o mayor al precio del objeto
  seleccionado y el objeto está disponible en el catálogo,
  cuando el jugador selecciona el objeto y confirma la compra en la interfaz de la tienda,
  entonces el sistema descuenta el precio del saldo del jugador, el objeto es añadido a su
  inventario, el saldo actualizado se muestra en pantalla y se presenta una confirmación visual
  del éxito de la transacción.

- **CA2 — Bloqueo de compra por saldo insuficiente**
  Dado que el saldo de moneda virtual del jugador es menor al precio del objeto deseado,
  cuando el jugador intenta confirmar la compra,
  entonces el sistema impide la transacción, muestra un mensaje indicando fondos insuficientes
  y resalta visualmente la diferencia entre el precio del objeto y el saldo disponible.

- **CA3 — Objeto no disponible en el catálogo**
  Dado que un objeto de la tienda ha sido marcado como agotado o retirado temporalmente del
  catálogo,
  cuando el jugador visualiza ese objeto en la tienda,
  entonces el objeto se muestra con un estado visual de "no disponible", el botón de compra
  está deshabilitado y el objeto permanece visible en el listado de la tienda.

- **CA4 — Límite de inventario alcanzado**
  Dado que el inventario del jugador ha alcanzado su capacidad máxima de almacenamiento,
  cuando el jugador intenta adquirir un nuevo objeto con saldo suficiente,
  entonces el sistema bloquea la compra, notifica al jugador que su inventario está lleno y
  sugiere gestionar o liberar espacio antes de continuar.

## Definition of Done

1. La compra queda implementada de extremo a extremo: interfaz (React), API (Express) y
   persistencia (PostgreSQL).
2. Los 4 criterios de aceptación están cubiertos por casos de prueba automatizados
   (ver `backend/test/tienda.test.js` y `CasosDePrueba.md`) y todos pasan.
3. El cambio se integró a `main` mediante Pull Request desde una rama de trabajo
   (`feature/us-02-sistema-compras`), con al menos una revisión antes del merge.
4. No quedan valores hardcodeados de jugador/objeto en la lógica de negocio: toda la
   información proviene de la base de datos.
5. Se revisó el código en busca de code smells evidentes antes del merge (ver
   `DeudaTecnica.md`).
6. El README permite instalar y ejecutar el sistema de forma autónoma, con y sin Docker.
