const db = require("../../models");
const AuthService = require("./auth.service");

const Stratage = require("passport-local").Strategy;

class LocalStratage {
  authService = new AuthService();

  constructor(passport) {
    this.passport = passport;
    this.passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    this.passport.deserializeUser(async (id, cb) => {
      try {
        const { password, ...result } = await this.authService.findById(id);
        cb(null, result);
      } catch (e) {
        return cb(e);
      }
    });
    this.initializeStratage();
  }

  initializeStratage() {
    this.passport.use(
      new Stratage(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (email, password, cb) => {
          try {
            const { success, error, result } =
              await this.authService.validateUser(email, password);
            if (success) {
              cb(null, result);
            } else {
              cb(null, false, error);
            }
          } catch (e) {
            cb(e);
          }
        }
      )
    );
  }
}

module.exports = LocalStratage;
