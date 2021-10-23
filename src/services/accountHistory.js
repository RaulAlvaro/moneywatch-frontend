import http from '../http-common';

class accountHistory {
  findAll() {
    return http.get('/accountHistory');
  }

  findOne(id) {
    return http.get(`/accountHistory/${id}`);
  }

  create(data) {
    return http.post('/accountHistory', data);
  }

  update(id, data) {
    return http.put(`/accountHistory/${id}`, data);
  }

  delete(id) {
    return http.delete(`/accountHistory/${id}`);
  }
}

export default new accountHistory();
