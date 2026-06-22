# Diagrama de Componentes (dependencias e interfaces)

A diferencia del diagrama de despliegue (que muestra nodos físicos/contenedores), este
diagrama muestra los **componentes de software** dentro del backend y sus interfaces
explícitas, siguiendo la arquitectura en capas definida en `Arquitectura.md`.

![Diagrama de componentes con interfaces](./img/diagrama_componentes.png)

<details>
<summary>Ver código fuente del diagrama (Mermaid)</summary>

```mermaid
graph TB
  subgraph Presentacion["Capa de presentación (API)"]
    R["tienda.js (rutas)<br/>«component»"]
  end

  subgraph Logica["Capa de lógica del juego"]
    S["tiendaService.js<br/>«component»"]
  end

  subgraph Datos["Capa de datos"]
    P["pool.js<br/>«component»"]
  end

  IF1(("ITiendaService"))
  IF2(("IPgPool"))

  R -.->|usa| IF1
  IF1 ===|implementa| S

  S -.->|usa| IF2
  IF2 ===|implementa| P

  P -->|driver pg| DB[(PostgreSQL)]

  style IF1 fill:#fff3d6,stroke:#854f0b
  style IF2 fill:#fff3d6,stroke:#854f0b
```

</details>

**Interfaces explícitas:**

- **`ITiendaService`**: expone `obtenerCatalogo()`, `obtenerJugador(id)`,
  `obtenerInventario(id)` y `comprarObjeto(jugadorId, objetoId)`. Es el contrato que la capa de
  presentación (`tienda.js`) consume sin conocer detalles de SQL ni de PostgreSQL —
  dependencia hacia la capa de lógica, nunca al revés.
- **`IPgPool`**: el pool de conexiones (`pool.js`) expone `query(sql, params)`. La capa de
  lógica depende de esta interfaz para ejecutar transacciones (`BEGIN`/`COMMIT`/`ROLLBACK`),
  sin que la capa de presentación tenga acceso directo a la base de datos.

Esta separación es la que permite, según `Arquitectura.md`, modificar las reglas de negocio de
la tienda (por ejemplo, agregar descuentos) sin tocar las rutas HTTP, y migrar de PostgreSQL a
otro motor sin tocar `tiendaService.js`.
