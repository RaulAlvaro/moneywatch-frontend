import http from '../http-common';

class accountService {
  findAll() {
    return http.get('/account');
  }

  findOne(id) {
    return http.get(`/account/${id}`);
  }

  create(data) {
    return http.post('/account', data);
  }

  update(id, data) {
    return http.put(`/account/${id}`, data);
  }

  delete(id) {
    return http.delete(`/account/${id}`);
  }
}

export default new accountService();
