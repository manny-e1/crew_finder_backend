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

    describe('Test GET /auditionPosts/:id', () => {
        test('it should respond with 200 after fetching the specified audition post', async () => {
            const _id = '611bfd157abd7837d81b5a28';
            const response = await request(app)
                .get(`/auditionposts/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
                .expect('Content-Type', /json/)
                .expect(200);
        });

        test('it should respond with 404 if the specified audition post does not exist', async () => {
            const _id = '611bfd157abd7837d81b5b28';
            const response = await request(app)
                .get(`/auditionposts/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
                .expect('Content-Type', /json/)
                .expect(404);
        });
    });

    describe('Test POST /auditionposts', () => {
        const completeAuditionPost = {
            title: "Test Audition",
            text: "Testing the audition post here",
            talents: ["ACTOR"],
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

    describe('Test PUT /auditionposts/:id', () => {
        const toUpdateAuditionPost = {
            author: "611c0cf0067de52fb03398f4",
            title: "Update Test Audition",
            text: "Testing the audition post here",
            talents: ["ACTOR"],
        };

        test('it should respond with 200 after updating existing audition post', async () => {
            const _id = '611c1d988c08472490c5228a';
            const response = await request(app)
                .put(`/auditionposts/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
                .send(toUpdateAuditionPost)
                .expect('Content-Type', /json/)
                .expect(200);
        });

        test('it should respond with 403 when trying to update other\'s audition', async () => {
            const _id = '611c2012ddddd63e6879b1fb';
            const response = await request(app)
                .put(`/auditionposts/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
                .send(toUpdateAuditionPost)
                .expect('Content-Type', /json/)
                .expect(403);
        });

        test('it should respond with 404 when trying to update unExisting audition', async () => {
            const _id = '611c2012ddddd63e6879b1eb';
            const response = await request(app)
                .put(`/auditionposts/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
                .send(toUpdateAuditionPost)
                .expect('Content-Type', /json/)
                .expect(404);
        });
    });


    describe('Test DELETE /auditionposts/id', () => {
        test('it should respond 200 after deleting a post with the specified id', async () =>{
            const _id = '611c1d988c08472490c5228a';        
            const response = await request(app)
                .delete(`/auditionposts/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    
        test('it should respond 404 if the specified id does not exist or is invalid', async () =>{
            const _id = '611c06c7c6de932ca8969219';
            const response = await request(app)
                .delete( `/auditionposts/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
                .expect('Content-Type',/json/)
                .expect(404);
        });
      });
    
    //   describe('Test DELETE /auditionposts', () => {
    //     test('it should respond 200 after deleting all posts', async () =>{        
    //         const response = await request(app)
    //             .delete('/auditionposts')
    //             .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMwY2YwMDY3ZGU1MmZiMDMzOThmNCIsImlhdCI6MTYyOTIyODI4Nn0.N6cxvsjse9eJrelrby-sa_aN-xIrRUupJZYLd95xpWI')
    //             .expect('Content-Type', /json/)
    //             .expect(200);
    //     });
    //   });
});