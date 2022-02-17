const BadRequestException = require("../../common/exceptions/bad-request.exception");
const reqWrapper = require("../../lib/request.handler");
const BoardController = require("./board.controller");

describe("보드 컨트롤러 테스트", () => {
  let boardController;
  const db = [
    {
      id: 1,
      title: "test1",
      content: "test",
      author: 1,
    },
    {
      id: 2,
      title: "test2",
      content: "test",
      author: 2,
    },
    {
      id: 3,
      title: "test3",
      content: "test",
      author: 3,
    },
  ];
  beforeAll(() => {
    boardController = new BoardController();
    boardController.boardService.get = jest.fn();
    boardController.boardService.post = jest.fn();
    boardController.boardService.delete = jest.fn();
    boardController.boardService.patch = jest.fn();
  });

  test("should has functions", () => {
    expect(typeof boardController.get).toBe("function");
    expect(typeof boardController.post).toBe("function");
    expect(typeof boardController.delete).toBe("function");
    expect(typeof boardController.patch).toBe("function");
  });

  describe("게시글 조회", () => {
    test("get test", async () => {
      boardController.boardService.get.mockImplementation((page) => db);
      expect(await boardController.get({ query: { page: 1 } })).toEqual(db);
    });
  });

  // describe("게시글 등록", () => {
  //   beforeAll(() => {
  //     boardController.boardService.post.mockResolvedValue(db[0]);
  //   });

  //   test("게시글 등록 성공", async () => {
  //     const fakeData = {
  //       body: {
  //         title: "test",
  //         content: "test",
  //         author: 1,
  //       },
  //       session: {
  //         user: {
  //           id: 1,
  //         },
  //       },
  //     };
  //     const res = {
  //       json: jest.fn().mockImplementation((data)=>{
  //           const d = data;
  //           return ()=>{
  //               return;
  //           }
  //       }),
  //     };
  //     const next = jest.fn();
  //     await reqWrapper(boardController.post)(fakeData, res, next);
  //     expect(res).toEqual({
  //       success: true,
  //       error: null,
  //       response: { id: 1, title: "test1", content: "test", author: 1 },
  //     });
  //   });

  // test("게시물 등록 실패 - 세션없음", async () => {
  //   const fakeData = {
  //     body: {
  //       title: "test",
  //       content: "test",
  //       author: 1,
  //     },
  //     session: {},
  //   };
  //   const res = {};
  //   const next = jest.fn();
  //   reqWrapper(boardController.post)(fakeData, res, next);
  //   console.log(res);
  // });
  // });
});
