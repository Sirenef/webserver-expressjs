const request = require("supertest");
const app = require("../../app");
describe(`Test GET /launches`, () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "Hunter 1",
    rocket: "Rocket Hunter 1",
    target: "Kepler-1652 b",
    launchDate: "January 4, 2028",
  };
  const launchDateWithoutDate = {
    mission: "Hunter 1",
    rocket: "Rocket Hunter 1",
    target: "Kepler-1652 b",
  };
  const launchDateWithInvalidDate = {
    mission: "Hunter 1",
    rocket: "Rocket Hunter 1",
    target: "Kepler-1652 b",
    launchDate: "fail",
  };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDateWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDateWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("It should catch invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDateWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
