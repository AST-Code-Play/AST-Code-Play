# Diagrama de Despliegue y Componentes

![Diagrama de despliegue y componentes](./img/diagrama_despliegue_componentes.png)

<details>
<summary>Ver código fuente del diagrama (Mermaid)</summary>

```mermaid
graph TB
  subgraph Cliente["Equipo del jugador (navegador)"]
    FE[Frontend React<br/>contenedor: ast-frontend<br/>puerto 4173]
  end

  subgraph Servidor["Servidor de aplicación"]
    BE[Backend Express<br/>contenedor: ast-backend<br/>puerto 3001]
  end

  subgraph BD["Servidor de base de datos"]
    DB[(PostgreSQL<br/>contenedor: ast-db<br/>puerto 5432)]
  end

  FE -->|HTTP/JSON REST| BE
  BE -->|SQL / pg driver| DB

  style FE fill:#aaf0c9,stroke:#0f6e56
  style BE fill:#aef0e0,stroke:#0f6e56
  style DB fill:#cce8ff,stroke:#185fa5
```

</details>

Los tres componentes se despliegan como contenedores Docker independientes, orquestados por
`docker-compose.yml` en la raíz del repositorio (bonus de contenedores, sección 5.7). En un
entorno sin Docker, los tres procesos se ejecutan localmente: Postgres como servicio del
sistema, y backend/frontend con Node.js (ver instrucciones en el README).
