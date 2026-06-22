const test = require('node:test');
const assert = require('node:assert');
const pool = require('../src/db/pool');
const tiendaService = require('../src/services/tiendaService');

async function resetEstado() {
  await pool.query("UPDATE jugadores SET saldo = 350 WHERE id = 'jugador-001'");
  await pool.query("DELETE FROM inventario WHERE jugador_id = 'jugador-001'");
  await pool.query("DELETE FROM transacciones WHERE jugador_id = 'jugador-001'");
}

test('CP-01: compra exitosa con saldo suficiente (CA1)', async () => {
  await resetEstado();
  const resultado = await tiendaService.comprarObjeto('jugador-001', 'obj-002'); 

  assert.strictEqual(resultado.ok, true);
  assert.strictEqual(resultado.codigo, 'COMPRA_EXITOSA');
  assert.strictEqual(resultado.jugador.saldo, 270);
  const inventario = await tiendaService.obtenerInventario('jugador-001');
  assert.ok(inventario.some((o) => o.id === 'obj-002'));
});

test('CP-02: bloqueo de compra por saldo insuficiente (CA2)', async () => {
  await resetEstado();
  await pool.query("UPDATE jugadores SET saldo = 50 WHERE id = 'jugador-001'"); 
  const resultado = await tiendaService.comprarObjeto('jugador-001', 'obj-003');

  assert.strictEqual(resultado.ok, false);
  assert.strictEqual(resultado.codigo, 'SALDO_INSUFICIENTE');
  assert.strictEqual(resultado.diferencia, 150);
});

test('CP-03: objeto no disponible en el catálogo (CA3)', async () => {
  await resetEstado();
  const resultado = await tiendaService.comprarObjeto('jugador-001', 'obj-004'); 

  assert.strictEqual(resultado.ok, false);
  assert.strictEqual(resultado.codigo, 'OBJETO_NO_DISPONIBLE');
});

test('CP-04: límite de inventario alcanzado (CA4)', async () => {
  const resultado = await tiendaService.comprarObjeto('jugador-003', 'obj-002'); 

  assert.strictEqual(resultado.ok, false);
  assert.strictEqual(resultado.codigo, 'INVENTARIO_LLENO');
});

test.after(async () => {
  await pool.end();
});
