const { test, expect, request } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');


test.describe('Users API - DELETE', () => {

  test('DELETE - deve deletar usuário existente', async ({ request }) => {

    const response = await request.delete(getEndpoint('/users/1'));

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Resposta da API:', body);

    expect(body.id).toBe(1);
  });


test('DELETE - não deve deletar usuário inexistente', async ({ request }) => {

  const response = await request.delete(getEndpoint('/users/999999'));

  console.log('Status:', response.status());

  expect(response.status()).toBe(404);
});


test('DELETE - não deve permitir deletar sem ID', async ({ request }) => {

  const response = await request.delete(getEndpoint('/users'));

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});


});
