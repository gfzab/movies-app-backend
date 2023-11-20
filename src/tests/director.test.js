const request = require('supertest');
const app = require('../app');
require ('../models');


let id;

test('GET /directors debe traer todos lo directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async () => {
    const director = {
        firstName: "James",
        lastName: "Cameron",
        nationality: "USA",
        image: "https://james-cameron.jpg.com",
        birthday: "1978-03-15",
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
});


test('PUT /directors/:id debe actualizar un director', async () => {
    const director = { firstName: "" };
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});

test('DELETE /directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete('/directors/'+id);
    expect(res.status).toBe(204);
})