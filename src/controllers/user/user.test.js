import request from "supertest";
import app from '../../app';



describe('Users API', () =>{
    describe('Test GET /users', () => {
    test('it should respond with 200 success', async ()=>{
        const response = await request(app)            
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200);
        });
    });

    describe('Test POST /users', () => {

        const completeUserData = {
            fullName: "Test Name",
            username: "tUser4",
            email: "test4@test.com",
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
            username: "tUser4",
            email: "test4@test.com",
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
        test('it should respond with 201 created', async () => {
            const response = await request(app)
                .post('/users')
                .send(completeUserData)
                .expect('Content-Type', /json/)
                .expect(201);

            // const requestDate = new Date(completeUserData.birthdate).valueOf();
            // const responseDate = new Date(response.body.birthdate).valueOf();

            // expect(responseDate).toBe(requestDate);
            // expect(response.body).toMatchObject(userDataWithoutBirthDate);
        });
    });

});