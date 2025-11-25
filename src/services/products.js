import api from './api';

export function listProducts() {
  return api.get('/products').then(r => r.data);
}

export function getProduct(id) {
  return api.get(`/products/${id}`).then(r => r.data);
}

export function createProduct(product) {
  return api.post('/products', product).then(r => r.data);
}

export function updateProduct(id, product) {
  return api.put(`/products/${id}`, product).then(r => r.data);
}

export function deleteProduct(id) {
  return api.delete(`/products/${id}`);
}
