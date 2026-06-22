# Diagrama de Casos de Uso

Cubre todas las historias de usuario definidas en el README del proyecto. La que está
**implementada y en alcance de esta entrega** es US-02 (Sistema de compras); el resto se
muestra para mantener trazabilidad con el modelo de dominio general, pero no forma parte del
desarrollo evaluado en esta Entrega 3 (ver sección 3 de la pauta — "no está incluido en esta
evaluación").

![Diagrama de casos de uso](./img/diagrama_casos_de_uso.png)

<details>
<summary>Ver código fuente del diagrama (Mermaid)</summary>

```mermaid
graph LR
  Jugador((Jugador))
  Desarrollador((Desarrollador))

  UC1[Seguir tutorial didáctico]
  UC2[Comprar objeto en la tienda]
  UC3[Ver lista de conexiones y estado]
  UC4[Configurar accesibilidad]
  UC5[Registrar actividad]
  UC6[Ver logros]
  UC7[Recuperar progreso guardado]
  UC8[Detectar colisiones de hitbox]
  UC9[Visualizar intento previo]
  UC10[Ver contador de intentos]

  Jugador --> UC1
  Jugador --> UC2
  Jugador --> UC3
  Jugador --> UC4
  Jugador --> UC6
  Jugador --> UC7
  Jugador --> UC9
  Jugador --> UC10
  Desarrollador --> UC5
  Desarrollador --> UC8

  style UC2 fill:#5ad1c4,stroke:#0f6e56,color:#04342c
```

</details>

**Caso de uso en alcance de esta entrega: UC2 — Comprar objeto en la tienda**, resaltado en el
diagrama, corresponde a US-02 y se describe en detalle en `EspecificacionHU.md`.
