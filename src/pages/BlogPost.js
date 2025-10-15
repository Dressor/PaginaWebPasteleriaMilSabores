import React from 'react';
import { useParams, Link } from 'react-router-dom';
import blogs from '../data/blogs';
import { Container, Button } from 'react-bootstrap';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogs.find(b => b.id === id);

  if (!post) return (
    <Container className='py-5'>
      <h2>Artículo no encontrado</h2>
      <p>Lo sentimos, no existe el artículo solicitado.</p>
      <Link to='/blogs' className='btn btn-outline-choco'>Volver a blogs</Link>
    </Container>
  );

  return (
    <main className='container py-4'>
      <nav aria-label='miga de pan'>
        <ol className='breadcrumb small'>
          <li className='breadcrumb-item'><Link to='/'>Inicio</Link></li>
          <li className='breadcrumb-item'><Link to='/blogs'>Blogs</Link></li>
          <li className='breadcrumb-item active' aria-current='page'>{post.title}</li>
        </ol>
      </nav>

      <article className='mx-auto' style={{maxWidth: 900}}>
        <img src={post.image} alt={post.title} className='img-fluid rounded shadow-sm mb-3' />
        <header className='mb-2'>
          <h1 className='brand-font text-choco h2 mb-1'>{post.title}</h1>
          <p className='text-muted mb-0'>{post.description}</p>
        </header>

        {post.content.map((p, i) => <p key={i}>{p}</p>)}

        <div className='d-flex flex-wrap gap-2 mt-4 pt-3 border-top'>
          {post.next && <Link to={`/blogs/${post.next}`} className='btn btn-outline-secondary' rel='next'>Siguiente →</Link>}
          <div className='ms-auto'>
            <Link to='/blogs' className='btn btn-outline-choco'>Volver a Blogs</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
