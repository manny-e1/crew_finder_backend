import { describe } from '@jest/globals';
import request from 'supertest';
import app from '../app';

describe('Application API', () => {
    describe('Test POST /applications', () => {
        const applicationSchema = {
            auditionPostId: '611c1dd5dd6bca1f38e0690b',
            applicantId: '611c1fdaddddd63e6879b1f7',
            applicationLetter: 'This a test application letter to a test auditionPost'
        };

        const incompleteApplicationSchema = {
            auditionPostId: '611c20a563ea184798a36507',
            applicantId: '611c1fdaddddd63e6879b1f7',
        };

        const appliedApplicationSchema = {
            auditionPostId: '611c20a563ea184798a36507',
            applicantId: '611c1fdaddddd63e6879b1f7',
            applicationLetter: 'This a test application letter to a test auditionPost'
        };

        test('it should respond with 201 applied', async () => {
            const response = await request(app)
                .post('/applications')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMxZmRhZGRkZGQ2M2U2ODc5YjFmNyIsImlhdCI6MTYyOTU2OTg5MH0.RZyU8NgW6yOladmfYRzvUhrq5bA7eZVgG0o8M7s9Efo')
                .send(applicationSchema)
                .expect('Content-Type',/json/)
                .expect(201);
        });

        test('it should respond with 400 when there is a missing required input', async () => {
            const response = await request(app)
                .post('/applications')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMxZmRhZGRkZGQ2M2U2ODc5YjFmNyIsImlhdCI6MTYyOTU2OTg5MH0.RZyU8NgW6yOladmfYRzvUhrq5bA7eZVgG0o8M7s9Efo')
                .send(incompleteApplicationSchema)
                .expect('Content-Type',/json/)
                .expect(400);
        });

        test('it should respond with 400 if the user already applied', async () => {
            const response = await request(app)
                .post('/applications')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMxZmRhZGRkZGQ2M2U2ODc5YjFmNyIsImlhdCI6MTYyOTU2OTg5MH0.RZyU8NgW6yOladmfYRzvUhrq5bA7eZVgG0o8M7s9Efo')
                .send(appliedApplicationSchema)
                .expect('Content-Type',/json/)
                .expect(400);
        });
    });    

    describe('Test GET /applications', () => {
        test('it should respond with 200 when fetching applications', async () =>{
            const response = request(app)
                .get('/applications')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMxZmRhZGRkZGQ2M2U2ODc5YjFmNyIsImlhdCI6MTYyOTU2OTg5MH0.RZyU8NgW6yOladmfYRzvUhrq5bA7eZVgG0o8M7s9Efo')
                .expect('Content-Type',/json/)
                .expect(200);
        });
    });

    describe('Test GET /applications/id', () => {
        test('it should respond with 200 if the application exists', async () => {
            const _id = '61214461b53c90393c3cbf36';
            const response = await request(app)
                .get(`/applications/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMxZmRhZGRkZGQ2M2U2ODc5YjFmNyIsImlhdCI6MTYyOTU2OTg5MH0.RZyU8NgW6yOladmfYRzvUhrq5bA7eZVgG0o8M7s9Efo')
                .expect('Content-Type',/json/)
                .expect(200);
        });

        test('it should respond with 404 if the application does not exist', async () => {
            const _id = '61214461b53c90393c3cbf44';
            const response = await request(app)
                .get(`/applications/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMxZmRhZGRkZGQ2M2U2ODc5YjFmNyIsImlhdCI6MTYyOTU2OTg5MH0.RZyU8NgW6yOladmfYRzvUhrq5bA7eZVgG0o8M7s9Efo')
                .expect('Content-Type',/json/)
                .expect(404);
        });
    });

    describe('Test PUT /applications/id', () => {
        const updateApplicationSchema = {
            auditionPostId: '611c20a563ea184798a36507',
            applicantId: '611c1fdaddddd63e6879b1f7',
            applicationLetter: 'This a test to update the application letter'
        };

        const oUpdateApplicationSchema = {
            auditionPostId: '611c20a563ea184798a36507',
            applicantId: '611c1fdaddddd63e6879b122',
            applicationLetter: 'This a test to update the application letter'
        };
        test('it should respond with 200 after updating the application', async () => {
            const _id = '61215e4d0d95f31b30db2eee';
            const response = await request(app)
                .put(`/applications/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMxZmRhZGRkZGQ2M2U2ODc5YjFmNyIsImlhdCI6MTYyOTU2OTg5MH0.RZyU8NgW6yOladmfYRzvUhrq5bA7eZVgG0o8M7s9Efo')
                .send(updateApplicationSchema)
                .expect('Content-Type',/json/)
                .expect(200);
        });

        test('it should respond with 403 when trying to update other\'s application', async () => {
            const _id = '61214461b53c90393c3cbf36';
            const response = await request(app)
                .put(`/applications/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMxZmRhZGRkZGQ2M2U2ODc5YjFmNyIsImlhdCI6MTYyOTU2OTg5MH0.RZyU8NgW6yOladmfYRzvUhrq5bA7eZVgG0o8M7s9Efo')
                .send(oUpdateApplicationSchema)
                .expect('Content-Type',/json/)
                .expect(403);
        });

        test('it should respond with 404 when trying to update unExisting application', async () => {
            const _id = '61214460b53c90193c3cbf34';
            const response = await request(app)
                .put(`/applications/${_id}`)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWMxZmRhZGRkZGQ2M2U2ODc5YjFmNyIsImlhdCI6MTYyOTU2OTg5MH0.RZyU8NgW6yOladmfYRzvUhrq5bA7eZVgG0o8M7s9Efo')
                .send(updateApplicationSchema)
                .expect('Content-Type',/json/)
                .expect(404);
        });
    });
});