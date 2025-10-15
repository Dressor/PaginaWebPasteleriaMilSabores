const blogs = [
  {
    id: '1',
    title: '50 años de dulzura',
    date: '2025-08-28',
    description: 'Nuestra historia de dulzura desde 1975: hitos, comunidad y tradición pastelera que sigue creciendo.',
    image: require('../assets/img/blog50anios.png'),
    content: [
      'Desde 1975, nuestra pastelería ha marcado hitos, incluyendo la colaboración en la torta más grande del mundo (1995). Hoy seguimos innovando online.',
      'Explora cómo combinamos tradición, calidad y comunidad para crear experiencias memorables.'
    ],
    next: '2'
  },
  {
    id: '2',
    title: 'Receta: tres leches clásica',
    date: '2025-08-29',
    description: 'Tips para lograr el equilibrio perfecto entre esponja y crema.',
    image: require('../assets/img/blog-tres-leches.jpeg'),
    content: [
      'La receta tradicional del tres leches se basa en una bizcochuelo ligero y una mezcla de leches que se absorbe lentamente.',
      'Sigue nuestras indicaciones para evitar que quede empapado en exceso y lograr la textura ideal.'
    ],
    prev: '1'
  }
];

export default blogs;
