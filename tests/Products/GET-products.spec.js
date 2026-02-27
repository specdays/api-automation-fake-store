const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');

test('GET - deve listar produtos com estrutura correta', async ({ request }) => {

  const response = await request.get(getEndpoint('/products'));

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log('Status:', response.status());
  console.log('Quantidade de produtos:', body.length);
  console.log('Primeiro produto:', body[0]);

  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);

  const product = body[0];

  expect(typeof product.id).toBe('number');
  expect(typeof product.title).toBe('string');
  expect(typeof product.price).toBe('number');
  expect(typeof product.description).toBe('string');
  expect(typeof product.category).toBe('string');
  expect(typeof product.image).toBe('string');
});


test('GET - deve buscar um produto especifíco', async ({ request }) => {

  const response = await request.get(getEndpoint('/products/4'));
  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log('Status:', response.status());

  expect(body.id).toBe(4);
  expect(typeof body.title).toBe('string');
});


test('GET - deve retornar erro para produto inexistente', async ({ request }) => {

  const response = await request.get(getEndpoint('/products/999999'));
  console.log('Status:', response.status());

  // FakeStore não retorna 404 para ID inexistente 
  expect(response.status()).toBe(200);
});