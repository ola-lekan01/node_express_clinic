import * as user from "../handlers/user";

describe("user handler", () => {
  it("This should create a new User", async () => {
    const req = {
      body: {
        username: "testing",
        password: "test",
        firstName: "testName",
        lastName: "testName",
      },
    };
    const res = {json({token}) {
        expect(token).toBeTruthy();
      }};
    const newUser = await user.createNewUser(req, res, () => {});
  });
});
