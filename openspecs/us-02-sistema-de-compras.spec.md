# openspecs/us-02-sistema-de-compras.spec.md

## Objetivo

Permitir que un jugador gaste su moneda virtual para adquirir objetos del catálogo de la
tienda, respetando reglas de saldo, disponibilidad y cupo de inventario.

## Entidades involucradas

- `Jugador(id, nombre, saldo, inventarioMax)`
- `Objeto(id, nombre, descripcion, tipo, precio, disponible)`
- `Inventario(jugadorId, objetoId, fechaAdquirido)` — relación N:M
- `Transaccion(jugadorId, objetoId, precioPagado, estado, motivoRechazo, fecha)`

## Contrato de la API

### `GET /api/catalogo`
Devuelve la lista completa de objetos de la tienda (disponibles y no disponibles).

### `GET /api/jugadores/:id`
Devuelve el estado actual del jugador (`saldo`, `inventarioMax`, etc.).

### `GET /api/jugadores/:id/inventario`
Devuelve los objetos que el jugador ya posee.

### `POST /api/compras`
Entrada: `{ "jugadorId": string, "objetoId": string }`

Reglas evaluadas en orden (cortocircuito en la primera que falle):

1. El objeto debe existir y estar `disponible = true` (CA3), si no → `409 OBJETO_NO_DISPONIBLE`.
2. `jugador.saldo >= objeto.precio` (CA2), si no → `402 SALDO_INSUFICIENTE` con `diferencia`.
3. `count(inventario del jugador) < jugador.inventarioMax` (CA4), si no → `409 INVENTARIO_LLENO`.
4. Si las tres se cumplen (CA1) → `201 COMPRA_EXITOSA`: descuenta saldo, agrega al inventario,
   registra la transacción como `exitosa`.

Toda evaluación, exitosa o rechazada, queda registrada en `Transaccion` para trazabilidad.

## Invariantes

- El saldo de un jugador nunca puede quedar negativo (`CHECK (saldo >= 0)` en la base de
  datos, como segunda línea de defensa además de la regla de negocio).
- Un jugador no puede tener más objetos en su inventario que `inventarioMax`.
- Cada operación de compra es atómica: o se aplican todos los efectos (descuento + inventario +
  transacción) o ninguno.

## Fuera de alcance (explícitamente, según la pauta de evaluación)

- Autenticación de usuarios real.
- Edición del catálogo desde la interfaz (CRUD de objetos) — el catálogo se carga por
  `schema.sql`.
- Despliegue en infraestructura productiva.
