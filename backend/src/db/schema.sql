-- US-02: Sistema de compras (tienda dentro del juego)
-- Esquema de base de datos PostgreSQL
--
-- Entidades del dominio para esta historia de usuario:
--   Jugador      -> cuenta con saldo de moneda virtual
--   Objeto       -> ítem del catálogo de la tienda (cosmético, consumible, mejora)
--   Inventario   -> relación N:M entre Jugador y Objeto (qué objetos posee cada jugador)
--   Transaccion  -> registro histórico de cada intento de compra (exitoso o rechazado),
--                   esta es la entidad "transacción que une 2+ entidades" exigida por la pauta.

DROP TABLE IF EXISTS transacciones CASCADE;
DROP TABLE IF EXISTS inventario CASCADE;
DROP TABLE IF EXISTS objetos CASCADE;
DROP TABLE IF EXISTS jugadores CASCADE;

CREATE TABLE jugadores (
    id              VARCHAR(20) PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    saldo           INTEGER NOT NULL DEFAULT 0 CHECK (saldo >= 0),
    inventario_max  INTEGER NOT NULL DEFAULT 20
);

CREATE TABLE objetos (
    id              VARCHAR(20) PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    descripcion     TEXT,
    tipo            VARCHAR(20) NOT NULL CHECK (tipo IN ('mejora', 'consumible', 'cosmetico')),
    precio          INTEGER NOT NULL CHECK (precio >= 0),
    disponible      BOOLEAN NOT NULL DEFAULT TRUE
);

-- Inventario: qué objetos posee cada jugador (relación N:M Jugador <-> Objeto)
CREATE TABLE inventario (
    id              SERIAL PRIMARY KEY,
    jugador_id      VARCHAR(20) NOT NULL REFERENCES jugadores(id) ON DELETE CASCADE,
    objeto_id       VARCHAR(20) NOT NULL REFERENCES objetos(id) ON DELETE RESTRICT,
    fecha_adquirido TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Transacciones: historial de cada intento de compra (CA1-CA4)
-- Esta tabla es la que materializa la "transacción que une 2+ entidades"
CREATE TABLE transacciones (
    id              SERIAL PRIMARY KEY,
    jugador_id      VARCHAR(20) NOT NULL REFERENCES jugadores(id) ON DELETE CASCADE,
    objeto_id       VARCHAR(20) NOT NULL REFERENCES objetos(id) ON DELETE RESTRICT,
    precio_pagado   INTEGER NOT NULL,
    estado          VARCHAR(20) NOT NULL CHECK (estado IN ('exitosa', 'rechazada')),
    motivo_rechazo  VARCHAR(50), -- 'saldo_insuficiente' | 'objeto_no_disponible' | 'inventario_lleno' | NULL
    fecha           TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Datos de ejemplo (equivalentes a API-US02.js original)
INSERT INTO jugadores (id, nombre, saldo, inventario_max) VALUES
    ('jugador-001', 'Marcos', 350, 20),
    ('jugador-002', 'Valentina', 80, 20),
    ('jugador-003', 'Rodrigo', 500, 20);

INSERT INTO objetos (id, nombre, descripcion, tipo, precio, disponible) VALUES
    ('obj-001', 'Escudo de cuero', 'Aumenta la defensa base en 10 puntos.', 'mejora', 150, TRUE),
    ('obj-002', 'Poción de velocidad', 'Incrementa la velocidad de movimiento durante 60 segundos.', 'consumible', 80, TRUE),
    ('obj-003', 'Skin: Guerrero Neon', 'Apariencia cosmética exclusiva de la temporada.', 'cosmetico', 200, TRUE),
    ('obj-004', 'Amuleto Ancestral', 'Objeto de edición limitada. Actualmente agotado.', 'mejora', 400, FALSE);

-- jugador-002 ya tiene obj-002 (igual que en los datos originales)
INSERT INTO inventario (jugador_id, objeto_id) VALUES ('jugador-002', 'obj-002');

-- jugador-003 tiene el inventario lleno (20 objetos) para poder probar CA4
INSERT INTO inventario (jugador_id, objeto_id)
SELECT 'jugador-003', 'obj-001' FROM generate_series(1, 20);
