const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');

test.describe('Auth API - POST', () => {

  test('POST - deve realizar login com credenciais válidas', async ({ request }) => {

    const validLogin = {
      username: "mor_2314",
      password: "83r5^_"
    };

    const response = await request.post(getEndpoint('/auth/login'), {
      data: validLogin
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Resposta da API:', body);

    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });


test('POST - não deve autenticar com senha inválida', async ({ request }) => {

  const invalidLogin = {
    username: "mor_2314",
    password: "senha_errada"
  };

  const response = await request.post(getEndpoint('/auth/login'), {
    data: invalidLogin
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});


test('POST - não deve autenticar sem username', async ({ request }) => {

  const invalidLogin = {
    password: "83r5^_"
  };

  const response = await request.post(getEndpoint('/auth/login'), {
    data: invalidLogin
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});


test('POST - não deve autenticar com body vazio', async ({ request }) => {

  const response = await request.post(getEndpoint('/auth/login'), {
    data: {}
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});


});