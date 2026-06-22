# Diagrama de Secuencia — Compra de un objeto (US-02)

Muestra el flujo completo de una compra desde la interfaz hasta la base de datos, incluyendo
el camino exitoso (CA1) y los puntos de corte donde se activan los rechazos (CA2–CA4).

![Diagrama de secuencia de compra](./img/diagrama_secuencia.png)

<details>
<summary>Ver código fuente del diagrama (Mermaid)</summary>

```mermaid
sequenceDiagram
  actor Jugador
  participant FE as Frontend (React)
  participant API as API /api/compras
  participant SVC as tiendaService
  participant DB as PostgreSQL

  Jugador->>FE: Clic en "Comprar"
  FE->>API: POST /api/compras {jugadorId, objetoId}
  API->>SVC: comprarObjeto(jugadorId, objetoId)
  SVC->>DB: BEGIN
  SVC->>DB: SELECT jugador FOR UPDATE
  SVC->>DB: SELECT objeto

  alt objeto no disponible (CA3)
    SVC->>DB: INSERT transaccion (rechazada)
    SVC->>DB: COMMIT
    SVC-->>API: ok:false, OBJETO_NO_DISPONIBLE
  else saldo insuficiente (CA2)
    SVC->>DB: INSERT transaccion (rechazada)
    SVC->>DB: COMMIT
    SVC-->>API: ok:false, SALDO_INSUFICIENTE
  else inventario lleno (CA4)
    SVC->>DB: INSERT transaccion (rechazada)
    SVC->>DB: COMMIT
    SVC-->>API: ok:false, INVENTARIO_LLENO
  else compra válida (CA1)
    SVC->>DB: UPDATE jugadores SET saldo
    SVC->>DB: INSERT inventario
    SVC->>DB: INSERT transaccion (exitosa)
    SVC->>DB: COMMIT
    SVC-->>API: ok:true, COMPRA_EXITOSA
  end

  API-->>FE: respuesta JSON + código HTTP
  FE-->>Jugador: actualiza saldo / inventario / mensaje
```

</details>

**Nota de consistencia:** todas las ramas (éxito o rechazo) pasan por una única transacción SQL
(`BEGIN`...`COMMIT`), lo que evita condiciones de carrera si dos compras del mismo jugador
llegan simultáneamente (el `SELECT ... FOR UPDATE` bloquea la fila del jugador mientras se
evalúan las reglas de negocio).
