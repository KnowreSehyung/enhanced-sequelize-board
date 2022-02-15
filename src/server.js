const BoardController = require("./api/board/board.controller");
const UserController = require("./api/user/user.controller");
const App = require("./app");

function bootStrap() {
  const app = new App([new UserController(), new BoardController()]);
  app.listen();
}

bootStrap();
