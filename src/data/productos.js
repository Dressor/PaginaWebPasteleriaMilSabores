import pastelChocolate from '../assets/img/pastelChocolate.png';
import pastelTresLeches from '../assets/img/pastelTresLeches.png';
import tortaVegana from '../assets/img/tortaVegana.png';
import tortaVainilla from '../assets/img/tortaVainilla.png';

const productos = [
  {
    codigo: 'choco',
    nombre: 'Torta de Chocolate',
    categoria: 'Tortas',
    descripcion: 'Deliciosa torta artesanal de chocolate.',
    stock: 12,
    precio: 15900,
    imagen: pastelChocolate,
  },
  {
    codigo: 'tresLeches',
    nombre: 'Torta Tres Leches',
    categoria: 'Tortas',
    descripcion: 'Humeda torta de tres leches.',
    stock: 8,
    precio: 12900,
    imagen: pastelTresLeches,
  },
  {
    codigo: 'tvegana',
    nombre: 'Torta Vegana',
    categoria: 'Tortas Veganas',
    descripcion: 'Rica torta sin origen animal.',
    stock: 2,
    precio: 18900,
    imagen: tortaVegana,
  },
  {
    codigo: 'vainilla',
    nombre: 'Torta de Vainilla',
    categoria: 'Tortas',
    descripcion: 'Rica torta de Vainilla. ',
    stock: 4,
    precio: 14900,
    imagen: tortaVainilla,
  },
 
];

export default productos;