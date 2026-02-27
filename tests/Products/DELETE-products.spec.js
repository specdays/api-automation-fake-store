const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');


test('DELETE - deve deletar um produto existente', async ({ request }) => {

  const response = await request.delete(getEndpoint('/products/1'));

  console.log('Status:', response.status());

  const body = await response.json();
  console.log('Resposta da API:', body);

  expect(response.status()).toBe(200);
  expect(body.id).toBe(1);
});


test('DELETE - não deve deletar produto inexistente', async ({ request }) => {

  const response = await request.delete(getEndpoint('/products/999999'));

  console.log('Status:', response.status());

  expect(response.status()).toBe(404);
});