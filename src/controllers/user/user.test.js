import request from "supertest";
import app from "../../app";

describe("Users API", () => {
  describe("Test GET /users", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app)
        .get("/users")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /users", () => {
    const completeUserData = {
      fullName: "Test Name",
      username: "tUser6",
      email: "test6@test.com",
      password: "Test123@",
      role: "ADMIN",
      talent: "ACTOR",
      otherTalents: "DIRECTOR",
      verification: "FAMOUS",
      birthdate: "2000-01-01",
      gender: "MALE",
      address: {
        country: "Test country",
        city: "Test city",
      },
      phoneNumber: "25190000000",
    };

    const userDataWithoutBirthDate = {
      fullName: "Test Name",
      username: "tUser",
      email: "test@test.com",
      password: "Test123@",
      role: "ADMIN",
      talent: "ACTOR",
      otherTalents: "DIRECTOR",
      verification: "FAMOUS",
      gender: "MALE",
      address: {
        country: "Test country",
        city: "Test city",
      },
      phoneNumber: "25190000000",
    };

    const invalidUserData = {
      fullName: "Test Name",
      username: "tUser5",
      email: "test5@test.com",
      password: "Test123@",
      role: "ADMIN",
      talent: "test here",
      otherTalents: "DIRECTOR",
      verification: "FAMOUS",
      birthdate: "2000-01-01",
      gender: "MALE",
      address: {
        country: "Test country",
        city: "Test city",
      },
      phoneNumber: "25190000000",
    };

    test("it should respond with 201 created", async () => {
      const response = await request(app)
        .post("/users")
        .send(completeUserData)
        .expect("Content-Type", /json/)
        .expect(201);

      // const requestDate = new Date(completeUserData.birthdate).valueOf();
      // const responseDate = new Date(response.body.birthdate).valueOf();

      // expect(responseDate).toBe(requestDate);
      // expect(response.body).toMatchObject(userDataWithoutBirthDate);
    });

    test("it should respond with 400 bad request, catch missing required field", async () => {
      const response = await request(app)
        .post("/users")
        .send(userDataWithoutBirthDate)
        .expect("Content-Type", /json/)
        .expect(400);
    });

    test("it should respond with 400, when invalid data is given", async () => {
      const response = await request(app)
        .post("/users")
        .send(invalidUserData)
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });

  describe('Test POST /users/login', () => {
      const email = 'test3@test.com';
      const password = 'Test123@';
      const wEmail = 'testt3@test.com';
      const wPassword = 'Test1123@';
      
      test('it should respond with 200 success logged in', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({email,password})
            .expect('Content-Type', /json/)
            .expect(200);
      });

      test('it should respond with 404 not found when email is incorrect', async () => {
          const email = wEmail;
        const response = await request(app)
            .post('/users/login')
            .send({email,password})
            .expect('Content-Type', /json/)
            .expect(404);

        expect(response.body).toStrictEqual({
            message: 'User not found'
        });
      });

      test('it should respond with 400 bad request when password is incorrect', async () => {
          const password = wPassword;
        const response = await request(app)
            .post('/users/login')
            .send({email,password})
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            message: 'Wrong credentials'
        });
      });
  });
});
