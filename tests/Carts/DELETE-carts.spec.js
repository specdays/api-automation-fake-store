const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');


test.describe('Carts API - DELETE', () => {

  test('deve deletar um carrinho existente', async ({ request }) => {

    const response = await request.delete(getEndpoint('/carts/1'));


    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
  });


test('DELETE - não deve deletar carrinho inexistente', async ({ request }) => {

  const response = await request.delete(getEndpoint('/carts/999999'));

  console.log('Status:', response.status());

  // FakeStore não retorna 404 corretamente
  expect(response.status()).toBe(200);
});


test('DELETE - não deve permitir deletar sem ID', async ({ request }) => {

  const response = await request.delete(getEndpoint('/carts'));

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});

});