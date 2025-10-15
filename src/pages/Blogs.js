import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Blogs.css';
import blog50 from '../assets/img/blog50anios.png';
import tresLeches from '../assets/img/blog-tres-leches.jpeg';

export default function Blogs() {
  return (
    <>
      <header className='bg-rose-subtle border-bottom'>
        <div className='container py-4'>
          <h1 id='blogsTitle' className='brand-font text-choco mb-1'>Noticias &amp; Datos Dulces</h1>
          <p className='text-muted mb-0'>Historias, recetas y comunidad.</p>
        </div>
      </header>

      <main className='container py-4'>
        <section className='row row-cols-1 row-cols-md-2 g-4' aria-labelledby='blogsTitle'>

          <article className='col'>
            <Card className='h-100 shadow-sm position-relative'>
              <Link to='/blogs/1' className='d-block' aria-label='Ir al artículo 50 años de dulzura'>
                <Card.Img
                  variant='top'
                  src={blog50}
                  alt='Pastel con vela dorada: 50 años de dulzura'
                  className='img-cover'
                  loading='lazy'
                />
              </Link>
              <Card.Body className='d-flex flex-column'>
                <Card.Title as='h2' className='h5 card-title mb-1'>50 años de dulzura</Card.Title>
                <Card.Text className='card-text'>Cómo evolucionó la pastelería desde 1975 hasta hoy.</Card.Text>
                <Link to='/blogs/1' className='stretched-link' aria-label='Leer más: 50 años de dulzura'></Link>
                <Button as={Link} to='/blogs/1' className='mt-auto btn-outline-choco'>Leer más</Button>
              </Card.Body>
            </Card>
          </article>

          <article className='col'>
            <Card className='h-100 shadow-sm position-relative'>
              <Link to='/blogs/2' className='d-block' aria-label='Ir al artículo Receta: tres leches clásica'>
                <Card.Img
                  variant='top'
                  src={tresLeches}
                  alt='Torta tres leches con crema: receta clásica'
                  className='img-cover1'
                  loading='lazy'
                />
              </Link>
              <Card.Body className='d-flex flex-column'>
                <Card.Title as='h2' className='h5 card-title mb-1'>Receta: tres leches clásica</Card.Title>
                <Card.Text className='card-text'>Tips para lograr el equilibrio perfecto entre esponja y crema.</Card.Text>
                <Link to='/blogs/2' className='stretched-link' aria-label='Leer más: tres leches clásica'></Link>
                <Button as={Link} to='/blogs/2' className='mt-auto btn-outline-choco'>Leer más</Button>
              </Card.Body>
            </Card>
          </article>

        </section>
      </main>
    </>
  );
}
