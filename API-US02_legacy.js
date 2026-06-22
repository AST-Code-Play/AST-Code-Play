const jugadores = {
  "jugador-001": {
    id: "jugador-001",
    nombre: "Marcos",
    saldo: 350,
    inventario: [],
    inventario_max: 20
  },
  "jugador-002": {
    id: "jugador-002",
    nombre: "Valentina",
    saldo: 80,
    inventario: ["obj-002"],
    inventario_max: 20
  },
  "jugador-003": {
    id: "jugador-003",
    nombre: "Rodrigo",
    saldo: 500,
    inventario: Array.from({ length: 20 }, (_, i) => `obj-slot-${i}`), // inventario lleno
    inventario_max: 20
  }
};

const catalogo = {
  "obj-001": {
    id: "obj-001",
    nombre: "Escudo de cuero",
    descripcion: "Aumenta la defensa base en 10 puntos.",
    tipo: "mejora",
    precio: 150,
    disponible: true
  },
  "obj-002": {
    id: "obj-002",
    nombre: "Poción de velocidad",
    descripcion: "Incrementa la velocidad de movimiento durante 60 segundos.",
    tipo: "consumible",
    precio: 80,
    disponible: true
  },
  "obj-003": {
    id: "obj-003",
    nombre: "Skin: Guerrero Neon",
    descripcion: "Apariencia cosmética exclusiva de la temporada.",
    tipo: "cosmético",
    precio: 200,
    disponible: true
  },
  "obj-004": {
    id: "obj-004",
    nombre: "Amuleto Ancestral",
    descripcion: "Objeto de edición limitada. Actualmente agotado.",
    tipo: "mejora",
    precio: 400,
    disponible: false
  }
};

const transacciones = [];

module.exports = { jugadores, catalogo, transacciones };
