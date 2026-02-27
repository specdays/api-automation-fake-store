const { test, expect, request } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');


test.describe('Users API - PUT', () => {

  test('PUT - deve atualizar usuário existente', async ({ request }) => {

    const updatedUser = {
      id: 1,
      username: "qa_updated",
      email: "updated@test.com",
      password: "654321"
    };

    const response = await request.put(getEndpoint('/users/1'), {
      data: updatedUser
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Resposta da API:', body);

    expect(body.username).toBe(updatedUser.username);
    expect(body.email).toBe(updatedUser.email);
  });


test('PUT - não deve atualizar usuário inexistente', async ({ request }) => {

  const updatedUser = {
    id: 999999,
    username: "ghost",
    email: "ghost@qa.com",
    password: "123456"
  };

  const response = await request.put(getEndpoint('/users/999999'), {
    data: updatedUser
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(404);
 });

});