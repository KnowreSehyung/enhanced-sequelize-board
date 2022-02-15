const { Router } = require("express");
const { body } = require("express-validator");
const BadRequestException = require("../../common/exceptions/bad-request.exception");
const reqWrapper = require("../../lib/request.handler");
const authGuard = require("../auth/auth.guard");
const BoardService = require("./board.service");

class BoardController {
  path = "/boards";
  router = Router();

  boardService = new BoardService();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = Router();
    router.get("/", reqWrapper(this.get.bind(this)));
    router.post(
      "/",
      authGuard(),
      body("title").not().isEmpty(),
      body("content").not().isEmpty(),
      reqWrapper(this.post.bind(this))
    );
    router.delete(
      "/",
      authGuard(),
      body("boardId").isNumeric().not().isEmpty(),
      reqWrapper(this.delete.bind(this))
    );
    router.patch(
      "/",
      authGuard(),
      body("boardId").isNumeric().not().isEmpty(),
      body("title").not().isEmpty(),
      body("content").not().isEmpty(),
      reqWrapper(this.patch.bind(this))
    );

    this.router.use(this.path, router);
  }

  async get(req, res) {
    const page = req.query.page;
    return await this.boardService.get(page);
  }

  async post(req, res) {
    const { title, content } = req.body;
    const user = req.session.user;
    
    return await this.boardService.post({ title, content, author: user.id });
  }

  async delete(req, res) {
    const { boardId } = req.body;
    const user = req.session.user;

    const ret = await this.boardService.delete({ boardId, author: user.id });
    if (ret === 0) {
      throw new BadRequestException();
    }
  }

  async patch(req, res) {
    const { boardId, title, content } = req.body;
    const user = req.session.user;

    const ret = await this.boardService.patch({
      boardId,
      title,
      content,
      author: user.id,
    });
    if (ret[0] === 0) {
      throw new BadRequestException();
    }
  }
}

module.exports = BoardController;
