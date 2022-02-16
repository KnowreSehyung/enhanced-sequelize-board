const { Router } = require("express");
const { body } = require("express-validator");
const reqWrapper = require("../../lib/request.handler");
const UserService = require("./user.service");
const passport = require("passport");
const authGuard = require("../auth/auth.guard");

class UserController {
  path = "/users";
  router = Router();

  userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = Router();
    router.post(
      "/signup",
      body("email").isEmail(),
      body("name").isLength({ min: 2 }),
      body("password").isLength({ min: 8 }),
      reqWrapper(this.create.bind(this))
    );
    router.post("/login", this.login.bind(this));
    router.post("/logout", authGuard(), reqWrapper(this.logout.bind(this)));

    this.router.use(this.path, router);
  }

  async create(req, res) {
    const { email, name, password } = req.body;
    return await this.userService.create({ email, name, password });
  }

  login(req, res, next) {
    passport.authenticate("local", (_, user, error) => {
      if (error) {
        return res.status(401).json({ success: false, error });
      }
      req.session.user = user;
      return res.json({ success: true, error: null });
    })(req, res, next);
  }

  logout(req, res) {
    if (req.session.user) req.session.destroy();
  }
}

module.exports = UserController;
