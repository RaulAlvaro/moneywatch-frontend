import http from '../http-common';

class typeAccountService {
  findAll() {
    return http.get('/typeAccount');
  }

  findOne(id) {
    return http.get(`/typeAccount/${id}`);
  }

  create(data) {
    return http.post('/typeAccount', data);
  }

  update(id, data) {
    return http.put(`/typeAccount/${id}`, data);
  }

  delete(id) {
    return http.delete(`/typeAccount/${id}`);
  }
}

export default new typeAccountService();
