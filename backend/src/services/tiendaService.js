const pool = require('../db/pool');

/**
 * Servicio de compras - US-02: Sistema de compras (tienda dentro del juego)
 *
 * Implementa los 4 criterios de aceptación definidos en EspecificacionHU.md:
 *   CA1 - Compra exitosa con saldo suficiente
 *   CA2 - Bloqueo de compra por saldo insuficiente
 *   CA3 - Objeto no disponible en el catálogo
 *   CA4 - Límite de inventario alcanzado
 *
 * La capa de lógica del juego (este servicio) no conoce HTTP; las rutas
 * (capa de presentación/API) son las que traducen el resultado a códigos
 * HTTP. Esto respeta la arquitectura en capas ya definida en Arquitectura.md.
 */

async function obtenerCatalogo() {
  const { rows } = await pool.query('SELECT * FROM objetos ORDER BY id');
  return rows;
}

async function obtenerJugador(jugadorId) {
  const { rows } = await pool.query('SELECT * FROM jugadores WHERE id = $1', [jugadorId]);
  return rows[0] || null;
}

async function obtenerInventario(jugadorId) {
  const { rows } = await pool.query(
    `SELECT o.* FROM inventario i
     JOIN objetos o ON o.id = i.objeto_id
     WHERE i.jugador_id = $1
     ORDER BY i.fecha_adquirido`,
    [jugadorId]
  );
  return rows;
}

/**
 * Ejecuta el intento de compra de un objeto por parte de un jugador.
 * Devuelve { ok: boolean, codigo, mensaje, jugador?, transaccion? }
 */
async function comprarObjeto(jugadorId, objetoId) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows: jugadorRows } = await client.query(
      'SELECT * FROM jugadores WHERE id = $1 FOR UPDATE',
      [jugadorId]
    );
    const jugador = jugadorRows[0];
    if (!jugador) {
      await client.query('ROLLBACK');
      return { ok: false, codigo: 'JUGADOR_NO_ENCONTRADO', mensaje: 'El jugador no existe.' };
    }

    const { rows: objetoRows } = await client.query(
      'SELECT * FROM objetos WHERE id = $1',
      [objetoId]
    );
    const objeto = objetoRows[0];
    if (!objeto) {
      await client.query('ROLLBACK');
      return { ok: false, codigo: 'OBJETO_NO_ENCONTRADO', mensaje: 'El objeto no existe en el catálogo.' };
    }

    // CA3: Objeto no disponible en el catálogo
    if (!objeto.disponible) {
      await registrarTransaccion(client, jugadorId, objetoId, objeto.precio, 'rechazada', 'objeto_no_disponible');
      await client.query('COMMIT');
      return {
        ok: false,
        codigo: 'OBJETO_NO_DISPONIBLE',
        mensaje: 'Este objeto no está disponible actualmente en la tienda.',
      };
    }

    // CA2: Bloqueo de compra por saldo insuficiente
    if (jugador.saldo < objeto.precio) {
      await registrarTransaccion(client, jugadorId, objetoId, objeto.precio, 'rechazada', 'saldo_insuficiente');
      await client.query('COMMIT');
      return {
        ok: false,
        codigo: 'SALDO_INSUFICIENTE',
        mensaje: `Saldo insuficiente. Te faltan ${objeto.precio - jugador.saldo} monedas.`,
        diferencia: objeto.precio - jugador.saldo,
      };
    }

    // CA4: Límite de inventario alcanzado
    const { rows: countRows } = await client.query(
      'SELECT COUNT(*)::int AS total FROM inventario WHERE jugador_id = $1',
      [jugadorId]
    );
    if (countRows[0].total >= jugador.inventario_max) {
      await registrarTransaccion(client, jugadorId, objetoId, objeto.precio, 'rechazada', 'inventario_lleno');
      await client.query('COMMIT');
      return {
        ok: false,
        codigo: 'INVENTARIO_LLENO',
        mensaje: 'Tu inventario está lleno. Libera espacio antes de continuar.',
      };
    }

    // CA1: Compra exitosa con saldo suficiente
    await client.query(
      'UPDATE jugadores SET saldo = saldo - $1 WHERE id = $2',
      [objeto.precio, jugadorId]
    );
    await client.query(
      'INSERT INTO inventario (jugador_id, objeto_id) VALUES ($1, $2)',
      [jugadorId, objetoId]
    );
    const { rows: transRows } = await client.query(
      `INSERT INTO transacciones (jugador_id, objeto_id, precio_pagado, estado, motivo_rechazo)
       VALUES ($1, $2, $3, 'exitosa', NULL) RETURNING *`,
      [jugadorId, objetoId, objeto.precio]
    );

    const jugadorActualizado = await client.query('SELECT * FROM jugadores WHERE id = $1', [jugadorId]);

    await client.query('COMMIT');
    return {
      ok: true,
      codigo: 'COMPRA_EXITOSA',
      mensaje: 'Compra realizada con éxito.',
      jugador: jugadorActualizado.rows[0],
      transaccion: transRows[0],
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function registrarTransaccion(client, jugadorId, objetoId, precio, estado, motivoRechazo) {
  await client.query(
    `INSERT INTO transacciones (jugador_id, objeto_id, precio_pagado, estado, motivo_rechazo)
     VALUES ($1, $2, $3, $4, $5)`,
    [jugadorId, objetoId, precio, estado, motivoRechazo]
  );
}

module.exports = {
  obtenerCatalogo,
  obtenerJugador,
  obtenerInventario,
  comprarObjeto,
};
