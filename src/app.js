const cookieParser = require("cookie-parser");
const { Router } = require("express");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const errorMiddleware = require("./middlewares/error.middleware");
const LocalStratage = require("./api/auth/local.stratage");
const { createClient } = require("redis");
const RedisStore = require("connect-redis")(session);
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const { stream } = require("./config/winston.config");

let redisClient = createClient({
  url: process.env.REDIS_HOST,
  legacyMode: true,
});
redisClient.connect().catch(console.error);

const PORT = process.env.PORT ?? 3000;

require("dotenv").config();

class App {
  localStratage = new LocalStratage(passport);

  constructor(controllers) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorMiddlewares();
    this.initializeSwagger();
  }

  initializeControllers(controllers = []) {
    const router = Router();
    router.get("/", (req, res) => res.send("OK"));

    controllers.forEach((con) => {
      router.use(con.router);
    });

    this.app.use("/api", router);
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
          httpOnly: true,
          secure: false,
        },
        store: new RedisStore({ client: redisClient, ttl: 3600 * 24 * 30 }),
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(morgan("combined", stream));
  }

  initializeErrorMiddlewares() {
    this.app.use(errorMiddleware);
  }

  initializeSwagger() {
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(require("./config/swagger-doc.config"))
    );
  }

  getServer() {
    return this.app;
  }

  listen() {
    this.app.listen(PORT, () => {
      console.log(`listen on ${PORT}`);
    });
  }
}

module.exports = App;
