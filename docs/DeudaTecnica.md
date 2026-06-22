# Deuda Técnica, Code Smells y Mejoras de Diseño

## 1. Code smells / deuda técnica identificada

| ID | Ubicación (archivo/módulo) | Descripción del problema | Propuesta de mejora |
|----|------------------------------|----------------------------|------------------------|
| DT-01 | `backend/src/server.js` | El jugador autenticado se asume fijo (`jugador-001` también en el frontend) — no hay autenticación real ni manejo de sesión. Es una simplificación deliberada para el alcance de esta entrega, pero es deuda técnica explícita. | Incorporar autenticación (JWT o sesión) en una entrega futura, de modo que `jugadorId` se derive del usuario autenticado y no se reciba como dato confiado desde el cliente. |
| DT-02 | `backend/src/services/tiendaService.js` | La función `comprarObjeto` concentra las 4 reglas de negocio (CA1–CA4) en un solo método largo con múltiples `if` secuenciales. Funciona y es legible hoy, pero si se agregan más reglas (ej. descuentos, objetos por tiempo limitado) el método crecerá en complejidad ciclomática. | Extraer cada validación a una función pura independiente (`validarDisponibilidad`, `validarSaldo`, `validarCupoInventario`) que se ejecuten en cadena, facilitando pruebas unitarias aisladas de cada regla. |
| DT-03 | `backend/src/routes/tienda.js` | El mapeo de códigos de negocio a códigos HTTP está hardcodeado como un objeto literal dentro del handler de la ruta. Si se agregan nuevos códigos de error en el servicio, hay que recordar actualizar este mapeo en un lugar distinto. | Mover el mapeo a una capa de middleware de manejo de errores centralizado, o anotar cada código de negocio con su HTTP status correspondiente en el propio servicio. |
| DT-04 | `frontend/src/App.jsx` | El componente `App` mezcla obtención de datos (fetch), estado de UI y renderizado en un solo componente, sin separar la lógica de llamadas a la API en un hook o cliente dedicado. | Extraer un hook `useTienda()` que encapsule las llamadas a `fetch` y el manejo de estado, dejando `App.jsx` enfocado solo en la presentación. |
| DT-05 | `.github/workflows/main.yml` (heredado de la entrega anterior) | Este archivo contiene la especificación de la historia de usuario en formato YAML dentro de la carpeta `.github/workflows/`, que está reservada para workflows de GitHub Actions. No es un workflow ejecutable y puede causar errores o confusión en el pipeline de CI/CD. | Mover el contenido a `EspecificacionHU.md` (ya realizado en esta entrega) y reemplazar este archivo por un workflow real de CI (lint + tests) o eliminarlo de `.github/workflows/`. |
| DT-06 | `repo raíz` | El modelo de dominio incluido originalmente en el `README.md` (clases `Player`, `Enemy`, `GameScene`, etc.) corresponde a la mecánica de juego (plataformas/sigilo) y no a las entidades de US-02 (Jugador, Objeto, Inventario, Transacción). Mantenerlo sin distinguir puede inducir a pensar que es el modelo vigente para esta entrega. | Documentar ambos modelos de dominio por separado y dejar explícito en el README cuál corresponde a la HU evaluada en esta entrega. |

## 2. Mejoras de diseño futuras

- **Separación de la capa de datos del catálogo respecto del motor del juego**: actualmente el
  catálogo de objetos vive únicamente en la base de datos del backend web. A futuro, si el motor
  del juego (capa de lógica del juego descrita en `Arquitectura.md`) necesita leer el inventario
  del jugador en tiempo real durante una partida, conviene definir un contrato de API claro entre
  ambos sistemas para evitar acoplamiento directo a la base de datos desde el cliente de juego.

- **Idempotencia en `POST /api/compras`**: si la petición se reintenta por una falla de red ya
  procesada en el servidor, el jugador podría ser cobrado dos veces. Se recomienda incorporar una
  clave de idempotencia (`idempotency-key`) por intento de compra, motivado por el requisito
  extrafuncional REF-01 (tiempos de respuesta) y REF-08 (calidad de rendimiento) ya priorizados
  en `ReqExtrafuncionales.md`.

- **Métricas de transacciones rechazadas**: la tabla `transacciones` ya registra los intentos
  fallidos con su motivo (`motivo_rechazo`). Esto habilita, a futuro, un panel de analítica para
  detectar fricción en la tienda (por ejemplo, qué objetos se intentan comprar más veces sin
  saldo suficiente), apoyando decisiones de balance económico del juego.
