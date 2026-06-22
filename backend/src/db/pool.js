const { Pool } = require('pg');
require('dotenv').config();

// La configuración se toma de variables de entorno (ver .env.example).
// DATABASE_URL tiene prioridad si está definida; si no, se arma desde las
// variables individuales PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE.
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'ast_code_play',
    });

module.exports = pool;
