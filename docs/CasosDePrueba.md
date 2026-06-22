# Casos de Prueba – US-02: Sistema de compras

| ID | Qué se debe hacer (acción / entrada) | Salida esperada |
|----|---------------------------------------|------------------|
| CP-01 | `POST /api/compras` con `jugadorId=jugador-001` (saldo 350) y `objetoId=obj-002` (precio 80, disponible). | HTTP 201. Respuesta `ok: true`, `codigo: COMPRA_EXITOSA`. El saldo del jugador queda en 270. El objeto `obj-002` aparece en `GET /api/jugadores/jugador-001/inventario`. |
| CP-02 | `POST /api/compras` con un jugador cuyo saldo (50) es menor al precio del objeto solicitado (`obj-003`, precio 200). | HTTP 402. Respuesta `ok: false`, `codigo: SALDO_INSUFICIENTE`, `diferencia: 150`. El saldo del jugador no cambia. No se agrega el objeto al inventario. |
| CP-03 | `POST /api/compras` con `objetoId=obj-004`, cuyo campo `disponible` es `false`. | HTTP 409. Respuesta `ok: false`, `codigo: OBJETO_NO_DISPONIBLE`. No se modifica el saldo ni el inventario del jugador. |
| CP-04 | `POST /api/compras` con un jugador cuyo inventario ya tiene 20/20 objetos (`jugador-003`), intentando comprar un objeto disponible y con saldo suficiente. | HTTP 409. Respuesta `ok: false`, `codigo: INVENTARIO_LLENO`. No se modifica el saldo ni el inventario del jugador. |
| CP-05 | `GET /api/catalogo` sin parámetros. | HTTP 200 con un arreglo de 4 objetos (`obj-001` a `obj-004`), incluyendo nombre, precio, tipo y disponibilidad. |

## Cobertura por tipo de operación exigida en la pauta

- **Transacción que une 2+ entidades (Jugador–Objeto):** CP-01, CP-02, CP-03, CP-04.
- **Consulta / lectura del catálogo:** CP-05.

## Ejecución

Los casos CP-01 a CP-04 están automatizados en `backend/test/tienda.test.js` usando el módulo
`node:test`. Para ejecutarlos:

```bash
cd backend
npm install
npm run db:init   # crea las tablas y carga los datos de ejemplo
npm test
```

CP-05 puede verificarse manualmente con:

```bash
curl http://localhost:3001/api/catalogo
```
