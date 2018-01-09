const request = require('supertest');
const app = require('./app.node.js');

describe('Testo il root', () => {
    test('Dovrebbe darmi 200', (done) => {
        request(app).get('/').then((res) => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });
});
/////////////////////////////////////////////////////////////////////////////
describe('Testo una pagina inesistente', () => {
    test('Dovrebbe darmi 404', (done) => {
        request(app).get('/sijdhfsjdhg').then((res) => {
            expect(res.statusCode).toBe(404);
            done();
        });
    });
});
/////////////////////////////////////////////////////////////////////////////
describe('Testo il get', () => {
    test('Dovrebbe darmi 200', (done) => {
        request(app).get('/visualizza/').then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.lista).not.toBe(undefined);
            done();
        });
    });
});
/////////////////////////////////////////////////////////////////////////////
describe('Testo il post', () => {
    test('Dovrebbe darmi 200', (done) => {
        request(app)
        .post('/aggiunta/')
        .send({
          taskId : 'addaddafs',
          assignmentId : 'ssf-234dd22-ffg33-4ffe43',
          workerId : 'dadww3332d2dttt1',
          assignmentResult : 'robe'
        })
        .then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.lista).not.toBe(undefined);
            done();
        });
    });
});
////////////////////////////////////////////////////////////////////////////
describe('Testo il put', () => {
    test('Dovrebbe darmi 200', (done) => {
        request(app)
        .put('/modifica/')
        .send({
          taskId : 'addaddafs',
          assignmentId : 'ssf-234dd22-ffg33-4ffe43',
          workerId : 'dadww3332d2dttt1',
          assignmentResult : 'robe'
        })
        .then((res) => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });
});
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
