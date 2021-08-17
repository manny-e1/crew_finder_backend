import mongoose from "mongoose";
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
      username: "tUser7",
      email: "test7@test.com",
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

  describe('Test POST /users/forgotpassword', () =>{
    test('it should send an email for reset confirmation to the user\'s email', async () => {
        const email = 'test2@test.com';
        const response = await request(app)
            .post('/users/forgotpassword')
            .send({email})
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('it should respond 404 when unregistered email is given', async () => {
      const email = 'testt2@test.com';
      const response = await request(app)
          .post('/users/forgotpassword')
          .send({email})
          .expect('Content-Type', /json/)
          .expect(404);

        expect(response.body).toStrictEqual({
          message: 'No email could not be sent'
        });
    });
  });

  describe('Test PUT /users/passwordreset/:resetToken', () =>{
    const password = 'NewTestPass1@';
    test('it should respond with 200 when resetting is successful after providing a new password', async () => {        
        const token = 'b085d394f36836ec3dce3ca1eded8dfa3a009fd4';
        const response = await request(app)
            .put(`/users/passwordreset/:${token}`)
            .send({password})
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('it should respond 400 when the token needed to reset the password is expired/invalid', async () => {              
      const token = 'b085d394f36836ec3dce3ca1eded8dfa3a009fd4';
      const response = await request(app)
          .put(`/users/passwordreset/:${token}`)
          .send({password})
          .expect('Content-Type', /json/)
          .expect(400);

        expect(response.body).toStrictEqual({
          message: 'Invalid Token'
        });
    });
  });

  describe('Test PUT /users/confirm-email/:confirmToken', () =>{
    test('it should respond with 200 when confirm email is successful', async () => {
      const confirmToken = 'b085d394f36836ec3dce3ca1eded8dfa3a009fd4@';
        const response = await request(app)
            .put(`/users/passwordreset/:${confirmToken}`)
            .expect('Content-Type', /json/)
            .expect(200);

          expect(response.body).toStrictEqual({
            message: 'Email confirmation successful'
          });
    });

    test('it should respond 400 when the token is expired/invalid', async () => {              
      const confirmToken = 'b085d394f36836ec3dce3ca1eded8dfa3a009fd4';
      const response = await request(app)
          .put(`/users/passwordreset/:${confirmToken}`)
          .expect('Content-Type', /json/)
          .expect(400);

        expect(response.body).toStrictEqual({
          message: 'Invalid Token'
        });
    });
  });

  describe('Test DELETE /users/id', () => {
    test('it should respond 200 after deleting a user with the specified id', async () =>{
        const _id = '61190c7912100c37f0bb3555';        
        const response = await request(app)
            .delete(`/users/${_id}`)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('it should respond 404 if the specified id does not exit', async () =>{
        const _id = '61190a7912100c37f0bb3565';
        const response = await request(app)
            .delete( `/users/${_id}`)
            .expect('Content-Type',/json/)
            .expect(404);
    });
  });

  describe('Test DELETE /users', () => {
    test('it should respond 200 after deleting all users', async () =>{        
        const response = await request(app)
            .delete('/users/')
            .expect('Content-Type', /json/)
            .expect(200);
    });
  });

});
