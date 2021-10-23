import http from '../http-common';

class paymentService {
  findAll() {
    return http.get('/payment');
  }

  findOne(id) {
    return http.get(`/payment/${id}`);
  }

  create(data) {
    return http.post('/payment', data);
  }

  update(id, data) {
    return http.put(`/payment/${id}`, data);
  }

  delete(id) {
    return http.delete(`/payment/${id}`);
  }
}

export default new paymentService();
