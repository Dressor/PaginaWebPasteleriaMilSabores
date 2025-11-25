import api from './api';

export function createOrder(order) {
  return api.post('/orders', order).then(r => r.data);
}

export function listOrders() {
  return api.get('/orders').then(r => r.data);
}

export function getOrder(id) {
  return api.get(`/orders/${id}`).then(r => r.data);
}
