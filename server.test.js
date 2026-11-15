const request = require('supertest');
const app = require('./server');

describe('Application tests', () => {
    test('The home page should return HTTP 200', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
    });

    test('The application should display the correct message', async () => {
        const response = await request(app).get('/');

        expect(response.text).toBe(
            'Hello from my Jenkins CI/CD application!'
        );
    });
});
