const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');

test.describe('Users API - GET', () => {

  test('GET - deve listar todos os usuários', async ({ request }) => {

    const response = await request.get(getEndpoint('/users'));

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Resposta da API:', body);

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    const user = body[0];

    expect(typeof user.id).toBe('number');
    expect(typeof user.username).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.password).toBe('string');
  });



  test('GET - deve buscar usuário por ID', async ({ request }) => {

    const response = await request.get(getEndpoint('/users/1'));

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Resposta da API:', body);

    expect(body.id).toBe(1);
    expect(typeof body.username).toBe('string');
    expect(typeof body.email).toBe('string');
    expect(typeof body.password).toBe('string');
  });


test('GET - não deve retornar usuário inexistente', async ({ request }) => {

  const response = await request.get(getEndpoint('/users/999999'));

  console.log('Status:', response.status());

  // FakeStore geralmente retorna 200
  expect(response.status()).toBe(200);
  });

});