const express = require('express');
const router = express.Router();
const tiendaService = require('../services/tiendaService');

router.get('/catalogo', async (req, res) => {
  try {
    const catalogo = await tiendaService.obtenerCatalogo();
    res.json(catalogo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno al obtener el catálogo.' });
  }
});

router.get('/jugadores/:id', async (req, res) => {
  try {
    const jugador = await tiendaService.obtenerJugador(req.params.id);
    if (!jugador) return res.status(404).json({ error: 'Jugador no encontrado.' });
    res.json(jugador);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno al obtener el jugador.' });
  }
});

router.get('/jugadores/:id/inventario', async (req, res) => {
  try {
    const inventario = await tiendaService.obtenerInventario(req.params.id);
    res.json(inventario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno al obtener el inventario.' });
  }
});

router.post('/compras', async (req, res) => {
  const { jugadorId, objetoId } = req.body;
  if (!jugadorId || !objetoId) {
    return res.status(400).json({ error: 'jugadorId y objetoId son obligatorios.' });
  }

  try {
    const resultado = await tiendaService.comprarObjeto(jugadorId, objetoId);

    if (resultado.ok) {
      return res.status(201).json(resultado);
    }

    const httpStatus = {
      JUGADOR_NO_ENCONTRADO: 404,
      OBJETO_NO_ENCONTRADO: 404,
      OBJETO_NO_DISPONIBLE: 409,
      SALDO_INSUFICIENTE: 402,
      INVENTARIO_LLENO: 409,
    }[resultado.codigo] || 400;

    return res.status(httpStatus).json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno al procesar la compra.' });
  }
});

module.exports = router;
