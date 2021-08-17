import request from "supertest";
import app from "../app";

describe('Audition Post API', () => {

    describe('Test GET /auditionPosts', () => {
        test('it should respond with 200 after fetching the audition posts', async () => {
            const response = await request(app)
                .get('/auditionposts')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /auditionposts', () => {
        const completeAuditionPost = {
            "title": "Test Audition",
            "text": "Testing the audition post here",
            "talents": ["ACTOR"],
        };

        const incompleteAuditionPost = {
            author: "611beb96a3bb8634b4de93bf",
            text: "Testing the audition post here",
            talents: ['ACTOR'],
        };

        test('it should respond 201 when the audition post is created', async () =>{
            const response = await request(app)
                .post('/auditionposts')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
                .send(completeAuditionPost)
                .expect('Content-Type', /json/)
                .expect(201);
        });

        test('it should respond 400 when the audition post misses a required attribute', async () =>{
            const response = await request(app)
                .post('/auditionposts')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')                
                .send(incompleteAuditionPost)
                .expect('Content-Type', /json/)
                .expect(400);
        });
    });
});