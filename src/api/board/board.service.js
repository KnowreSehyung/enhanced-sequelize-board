const db = require("../../models");

class BoardService {
  boards = db.Board;
  constructor() {}

  get(page = 1) {
    const limit = 10;
    const offset = 0 + (page - 1) * limit;

    return this.boards.findAndCountAll({
      attributes: ["id", "title", "content", "author", "createdAt"],
      limit,
      offset,
      order: [["id", "DESC"]],
      include: { model: db.User, attributes: ["id", "name"] },
    });
  }

  post({ title, content, author }) {
    return this.boards.create({ title, content, author });
  }

  delete({ author, boardId }) {
    return this.boards.destroy({ where: { id: boardId, author } });
  }

  async patch({ boardId, title, content, author }) {
    return this.boards.update(
      { title, content },
      { where: { id: boardId, author } }
    );
  }
}

module.exports = BoardService;
