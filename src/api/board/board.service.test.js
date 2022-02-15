const BoardService = require("./board.service");

describe("보드서비스 테스트", () => {
  let boardService;
  beforeAll(() => {
    boardService = new BoardService();
  });
  test("should has functions", () => {
    expect(typeof boardService.get).toBe("function");
    expect(typeof boardService.post).toBe("function");
    expect(typeof boardService.delete).toBe("function");
    expect(typeof boardService.patch).toBe("function");
  });

  describe("기능 테스트", () => {
    beforeAll(() => {
      boardService.boards.findAndCountAll = jest.fn();
      boardService.boards.create = jest.fn();
      boardService.boards.destroy = jest.fn();
      boardService.boards.update = jest.fn();
    });

    test("get test", async () => {
      const fakeValue = [
        {
          id: 1,
          email: "test@test.com",
          name: "tester",
        },
        {
          id: 2,
          email: "test2@test.com",
          name: "tester2",
        },
      ];
      boardService.boards.findAndCountAll.mockResolvedValue(fakeValue);
      const posts = await boardService.get(1);
      expect(posts).toEqual(fakeValue);
    });

    test("post test", async () => {
      const fakeValue = {
        title: "test",
        content: "test",
        author: 1,
      };

      boardService.boards.create.mockResolvedValue(fakeValue);
      const post = await boardService.post(fakeValue);
      expect(fakeValue).toEqual(post);
    });

    describe("게시글 삭제", () => {
      const fakeValue = {
        boardId: 1,
        author: 1,
      };
      beforeAll(() => {
        boardService.boards.destroy.mockImplementation(
          ({ where: { id: boardId, author } }) => {
            if (boardId !== fakeValue.boardId || author !== fakeValue.author) {
              return false;
            }
            return true;
          }
        );
      });

      test("작성자와 게시번호 모두 맞을경우", async () => {
        const ret = await boardService.delete({ boardId: 1, author: 1 });
        expect(ret).toBe(true);
      });

      test("작성자만 맞고 게시글 번호가 없는 경우", async () => {
        const ret = await boardService.delete({ boardId: -1, author: 1 });
        expect(ret).toBe(false);
      });

      test("게시글 작성자가 다른경우", async () => {
        const ret = await boardService.delete({ boardId: 1, author: 2 });
        expect(ret).toBe(false);
      });

      test("게시글이 없고 작성자만 있는경우", async () => {
        const ret = await boardService.delete({ boardId: -1, author: 2 });
        expect(ret).toBe(false);
      });
    });

    describe("업데이트 테스트", () => {
      beforeAll(() => {
        boardService.boards.update.mockImplementation(
          ({ where: { id: boardId, title, content, author } }) => {}
        );
      });
      test("작성자가 아닐경우", () => {});
    });
  });
});
