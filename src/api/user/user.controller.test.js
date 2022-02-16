const UserController = require("./user.controller");
const UserService = require("./user.service");

describe("유저 컨트롤러 테스트", () => {
  let userController;
  beforeAll(() => {
    userController = new UserController();
  });

  test("should has functions", () => {
    expect(typeof userController.create).toBe("function");
    expect(typeof userController.login).toBe("function");
    expect(typeof userController.logout).toBe("function");
  });

  describe("유저 생성 테스트", () => {
    const userData = {
      email: "test@test.com",
      name: "tester",
      password: "1234qwer",
    };
    beforeAll(() => {
      userController.userService.create = jest.fn();
      userController.userService.create.mockImplementation((data) => data);
    });

    test("유저 생성 성공", async () => {
      const fakeData = {
        body: {
          email: "test@test.com",
          name: "tester",
          password: "1234qwer",
        },
      };
      expect(await userController.create(fakeData)).toEqual(userData);
    });

    test("email 없을시 실패", async () => {
      const fakeData = {
        body: {
          name: "tester",
          password: "1234qwer",
        },
      };
      expect(await userController.create(fakeData)).not.toEqual(userData);
    });

    test("name 없을시 실패", async () => {
      const fakeData = {
        body: {
          email: "test@test.com",
          password: "1234qwer",
        },
      };
      expect(await userController.create(fakeData)).not.toEqual(userData);
    });

    test("password 없을시 실패", async () => {
      const fakeData = {
        body: {
          email: "test@test.com",
          name: "tester",
        },
      };
      expect(await userController.create(fakeData)).not.toEqual(userData);
    });
  });
});
