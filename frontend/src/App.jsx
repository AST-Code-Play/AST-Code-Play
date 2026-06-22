import React, { useEffect, useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const JUGADOR_ID = 'jugador-001'; // jugador fijo para esta demo de la HU

export default function App() {
  const [jugador, setJugador] = useState(null);
  const [catalogo, setCatalogo] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [mensaje, setMensaje] = useState(null); // { tipo: 'exito' | 'error', texto }
  const [cargando, setCargando] = useState(false);

  const cargarDatos = useCallback(async () => {
    const [jugadorRes, catalogoRes, inventarioRes] = await Promise.all([
      fetch(`${API_URL}/jugadores/${JUGADOR_ID}`),
      fetch(`${API_URL}/catalogo`),
      fetch(`${API_URL}/jugadores/${JUGADOR_ID}/inventario`),
    ]);
    setJugador(await jugadorRes.json());
    setCatalogo(await catalogoRes.json());
    setInventario(await inventarioRes.json());
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  async function comprar(objetoId) {
    setCargando(true);
    setMensaje(null);
    try {
      const res = await fetch(`${API_URL}/compras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jugadorId: JUGADOR_ID, objetoId }),
      });
      const data = await res.json();

      if (data.ok) {
        setMensaje({ tipo: 'exito', texto: data.mensaje });
      } else {
        setMensaje({ tipo: 'error', texto: data.mensaje || 'No se pudo completar la compra.' });
      }
      await cargarDatos();
    } catch (err) {
      setMensaje({ tipo: 'error', texto: 'Error de conexión con el servidor.' });
    } finally {
      setCargando(false);
    }
  }

  const inventarioLleno = jugador && inventario.length >= jugador.inventario_max;

  return (
    <div className="contenedor">
      <header className="encabezado">
        <h1>Tienda — AST Code &amp; Play</h1>
        {jugador && (
          <div className="estado-jugador">
            <span>{jugador.nombre}</span>
            <span className="saldo">{jugador.saldo} 🪙</span>
            <span className="inventario-contador">
              Inventario: {inventario.length}/{jugador.inventario_max}
            </span>
          </div>
        )}
      </header>

      {mensaje && <div className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</div>}

      <main className="grilla-catalogo">
        {catalogo.map((obj) => {
          const yaPoseido = inventario.some((i) => i.id === obj.id);
          const sinSaldo = jugador && jugador.saldo < obj.precio;
          const deshabilitado = !obj.disponible || sinSaldo || inventarioLleno || cargando;

          return (
            <article key={obj.id} className={`tarjeta-objeto ${!obj.disponible ? 'no-disponible' : ''}`}>
              <h2>{obj.nombre}</h2>
              <p className="descripcion">{obj.descripcion}</p>
              <p className="tipo">{obj.tipo}</p>
              <p className="precio">{obj.precio} 🪙</p>

              {!obj.disponible && <span className="etiqueta">No disponible</span>}
              {yaPoseido && obj.disponible && <span className="etiqueta etiqueta-poseido">En tu inventario</span>}

              <button onClick={() => comprar(obj.id)} disabled={deshabilitado}>
                Comprar
              </button>
            </article>
          );
        })}
      </main>
    </div>
  );
}
