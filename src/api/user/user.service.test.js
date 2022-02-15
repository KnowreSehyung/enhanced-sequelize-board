const UserService = require("./user.service");

describe("유저 서비스 테스트", () => {
  let userService;
  beforeAll(() => {
    userService = new UserService();
  });

  test("should have a create function", () => {
    expect(typeof userService.create).toBe("function");
  });

  test("create test", async () => {
    const fakeUser = {
      id: 1,
      email: "test@test.com",
      password: "asdfasdf",
    };

    userService.users.create = jest.fn();
    userService.users.create.mockResolvedValue(fakeUser);
    const user = await userService.create(fakeUser);
    expect(user).toBe(fakeUser);
  });
});
