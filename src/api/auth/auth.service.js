const bcrypt = require("bcrypt");
const db = require("../../models");

class AuthService {
  users = db.User;

  constructor() {}

  async findById(id) {
    return await this.users.findOne({ where: { id }, raw: true });
  }

  async validateUser(email, password) {
    const user = await this.users.findOne({ where: { email }, raw: true });
    let msg = "";
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return { success: true, error: null, result };
      } else {
        msg = "비밀번호가 틀렸습니다.";
      }
    } else {
      msg = "존재하지 않는 유저입니다.";
    }
    return { success: false, error: msg, result: null };
  }
}

module.exports = AuthService;
