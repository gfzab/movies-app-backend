const request = require('supertest');
const app = require('../app');
require ('../models');

let id;

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
    const actor = {
        firstName: "Jose",
        lastName: "Zabala",
        nationality: "Col",
        image: "https://image.jpg.com",
        birthday: "2002-10-12",
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);
});

test('PUT /actors/:id debe actualizar un genero', async () => {
    const actor = { firstName: "" };
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
})

test('DELETE /actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete('/actors/'+id);
    expect(res.status).toBe(204);
})