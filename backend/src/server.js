const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tiendaRoutes = require('./routes/tienda');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', tiendaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend US-02 (Sistema de compras) escuchando en http://localhost:${PORT}`);
});
