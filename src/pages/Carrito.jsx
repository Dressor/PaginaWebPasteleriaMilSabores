import React from 'react';
import { Helmet } from 'react-helmet';
import { Table, Button } from 'react-bootstrap';
import SectionHeader from '../components/SectionHeader';
import './Home.css';

export default function Carrito() {
  return (
    <>
      <Helmet>
        <title>Carrito | Pastelería 1000 Sabores</title>
      </Helmet>

      <SectionHeader
        title="Tu carrito"
        subtitle="Revisa tus productos antes de finalizar tu compra"
      />

      <div className="container py-4">
        <div className="card p-3 shadow-sm">
          <Table responsive hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Torta Chocolate</td>
                <td>1</td>
                <td>$12.000</td>
                <td>$12.000</td>
              </tr>
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button variant="outline-choco">Seguir comprando</Button>
            <Button className="btn-choco">Proceder al pago</Button>
          </div>
        </div>
      </div>
    </>
  );
}
