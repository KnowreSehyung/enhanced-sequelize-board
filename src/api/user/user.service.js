const db = require("../../models");

class UserService {
  users = db.User;

  constructor() {}

  create(userData) {
    return this.users.create(userData);
  }
}

module.exports = UserService;
