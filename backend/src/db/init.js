// Ejecuta schema.sql contra la base de datos configurada en .env
// Uso: npm run db:init
const fs = require('fs');
const path = require('path');
const pool = require('./pool');

async function init() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  console.log('Ejecutando schema.sql contra la base de datos...');
  try {
    await pool.query(schema);
    console.log('Base de datos inicializada correctamente (tablas + datos de ejemplo).');
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

init();
