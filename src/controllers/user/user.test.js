import request from "supertest";
import app from '../../app';

describe('Test GET /users', () => {
    test('it should respond with 200 success', async ()=>{
        const response = await request(app)            
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});