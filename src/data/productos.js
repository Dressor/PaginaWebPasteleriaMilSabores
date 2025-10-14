import pastelChocolate from '../assets/img/pastelChocolate.png';
import pastelTresLeches from '../assets/img/pastelTresLeches.png';
import tortaVegana from '../assets/img/tortaVegana.png';
import tortaVainilla from '../assets/img/tortaVainilla.png';
import pastelZanahoria from '../assets/img/pastelZanahoria.png';
import cheesecakeFrutosRojos from '../assets/img/cheesecakeFrutosRojos.png';
import muffinArandanos from '../assets/img/muffinArandanos.png';
import galletasAvena from '../assets/img/galletasAvena.png';
import donasGlaseadas from '../assets/img/donasGlaseadas.png';
import tartaManzana from '../assets/img/kuchenManzana.png';
import brazoGitano from '../assets/img/brazoGitano.png';
import tiramisu from '../assets/img/tiramisu.png';
import cupcakesRedVelvet from '../assets/img/cupcakesRedVelvet.png';
import browniesChocolate from '../assets/img/browniesChocolate.png';


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
  {
    codigo: 'zanahoria',
    nombre: 'Pastel de Zanahoria',
    categoria: 'Pasteles',
    descripcion: 'Suave pastel de zanahoria con glaseado de queso crema.',
    stock: 10,
    precio: 16500,
    imagen: pastelZanahoria,
  },
  {
    codigo: 'cheesecake',
    nombre: 'Cheesecake de Frutos Rojos',
    categoria: 'Postres Fríos',
    descripcion: 'Cremoso cheesecake con coulis de frutos rojos frescos.',
    stock: 7,
    precio: 17800,
    imagen: cheesecakeFrutosRojos,
  },
  {
    codigo: 'muffinAra',
    nombre: 'Muffin de Arándanos',
    categoria: 'Muffins',
    descripcion: 'Muffin esponjoso relleno de jugosos arándanos.',
    stock: 20,
    precio: 4500,
    imagen: muffinArandanos,
  },
  {
    codigo: 'galletaAve',
    nombre: 'Galletas de Avena',
    categoria: 'Galletas',
    descripcion: 'Galletas saludables de avena y pasas, ideales para el desayuno.',
    stock: 30,
    precio: 3200,
    imagen: galletasAvena,
  },
  {
    codigo: 'donasGla',
    nombre: 'Donas Glaseadas',
    categoria: 'Donas',
    descripcion: 'Clásicas donas cubiertas con un dulce glaseado.',
    stock: 15,
    precio: 3800,
    imagen: donasGlaseadas,
  },
  {
    codigo: 'tartaManz',
    nombre: 'Tarta de Manzana',
    categoria: 'Tartas',
    descripcion: 'Tradicional tarta de manzana con un toque de canela.',
    stock: 6,
    precio: 14900,
    imagen: tartaManzana,
  },
  {
    codigo: 'brazoGit',
    nombre: 'Brazo de Gitano',
    categoria: 'Bizcochos Enrollados',
    descripcion: 'Brazo de gitano relleno de crema y frutas confitadas.',
    stock: 5,
    precio: 13500,
    imagen: brazoGitano,
  },
  {
    codigo: 'tiramisu',
    nombre: 'Tiramisú Clásico',
    categoria: 'Postres Italianos',
    descripcion: 'Auténtico tiramisú con capas de bizcocho, café y mascarpone.',
    stock: 9,
    precio: 18500,
    imagen: tiramisu,
  },
  {
    codigo: 'cupRedV',
    nombre: 'Cupcakes Red Velvet',
    categoria: 'Cupcakes',
    descripcion: 'Cupcakes de terciopelo rojo con suave crema de queso.',
    stock: 18,
    precio: 5200,
    imagen: cupcakesRedVelvet,
  },
  {
    codigo: 'browniesChoco',
    nombre: 'Brownies de Chocolate',
    categoria: 'Brownies',
    descripcion: 'Intensos brownies de chocolate con nueces.',
    stock: 14,
    precio: 6800,
    imagen: browniesChocolate,
  },
];

export default productos;