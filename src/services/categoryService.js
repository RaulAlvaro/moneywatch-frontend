import http from '../http-common';

class categoryService {
  findAll() {
    return http.get('/category');
  }

  findOne(id) {
    return http.get(`/category/${id}`);
  }

  create(data) {
    return http.post('/category', data);
  }

  update(id, data) {
    return http.put(`/category/${id}`, data);
  }

  delete(id) {
    return http.delete(`/category/${id}`);
  }
}

export default new categoryService();
