import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Login from './pages/Login';
import PropyState from './pages/PropyState';
import 'bootstrap/dist/css/bootstrap.min.css';
import productos from './data/productos'; // ← Corrige la ruta aquí
import Producto from './pages/Productos';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <div className='container py-4 flex-grow-1'>
        <nav className='mb-3 d-flex gap-3'>
          <Link to='/'>Home</Link>
          <Link to='/productos'>Productos</Link>
          <Link to='/login'>Login</Link>
          <Link to='/propyState'>Ejemplo de Prop y State</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/login' element={<Login />} />
          <Route path='/propyState' element={<PropyState valorInicial={100} />} />
          <Route path="/producto/:code" element={<Producto />} />
        </Routes>
        <footer className='mt-4 text-center'>
          2025 PAGINA DISEÑADA POR DUOC UC
        </footer>
      </div>
    </div>
  );
}

export default App;