const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require ('../models');


let id;

test('GET /movies debe traer todas las movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una movie', async () => {
    const movie = {
        name: "Avatar",
        image: "https://avatar.jpg.com",
        synopsis: "Muy buena",
        releaseYear: "2008",
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id debe actualizar una movie', async () => {
    const movie = { name: "" };
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});


test('POST /movies/:id/actor debe insertar un actor a movies', async () => {
    const actor = await Actor.create({
        firstName: "Juan",
        lastName: "Zabala",
        nationality: "Ven",
        image: "https://image.com",
        birthday: "2008-08-15",
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})

test('POST /movies/:id/directors debe insertar un director a movies', async () => {
    const director = await Director.create({
        firstName: "Leonel",
        lastName: "Cortinez",
        nationality: "Ven",
        image: "https://image.com",
        birthday: "2010-10-11",
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})

test('POST /movies/:id/actor debe insertar un genre a movies', async () => {
    const genre = await Genre.create({
        name: "Accion",
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})

test('DELETE /movies/:id debe eliminar una movie', async () => {
    const res = await request(app).delete('/movies/'+id);
    expect(res.status).toBe(204);
});

