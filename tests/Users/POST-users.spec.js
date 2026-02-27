const { test, expect, request } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');


test.describe('Users API - POST', () => {

  test('POST - deve criar um novo usuário', async ({ request }) => {

    const newUser = {
      username: "qa_user_test",
      email: "qa@test.com",
      password: "123456"
    };

    const response = await request.post(getEndpoint('/users'), {
      data: newUser
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log('Resposta da API:', body);

    expect(typeof body.id).toBe('number');
    expect(body.username).toBe(newUser.username);
    expect(body.email).toBe(newUser.email);
  });


test('POST - não deve criar usuário sem username', async ({ request }) => {

  const invalidUser = {
    email: "teste@qa.com",
    password: "123456"
  };

  const response = await request.post(getEndpoint('/users'), {
    data: invalidUser
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
 });


test('POST - não deve aceitar email inválido', async ({ request }) => {

  const invalidUser = {
    username: "qa_user",
    email: "email-invalido",
    password: "123456"
  };

  const response = await request.post(getEndpoint('/users'), {
    data: invalidUser
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
 });

});