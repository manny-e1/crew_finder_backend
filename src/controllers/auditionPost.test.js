import request from "supertest";
import app from "../app";

describe('Audition Post API', () => {

    describe('Test GET /auditionPosts', () => {
        test('it should respond with 200 after fetching the audition posts', async () => {
            const response = await request(app)
                .get('/auditionposts')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    
});