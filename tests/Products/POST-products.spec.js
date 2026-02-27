const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');


test('POST - criar um novo produto', async ({ request }) => {

  const newProduct = {
    title: "PRODUTO TESTE QA",
    price: 29.99,
    description: "Produto criado via automação",
    image: "https://images.tcdn.com.br/img/img_prod/1157659/stick_video_game_10_mil_jogos_22994_1_8eee8ae99fa42a4b60b68649bdf7bfbb.png",
    category: "electronics"
  };

  console.log('Enviando payload', newProduct);

  const response = await request.post(getEndpoint('/products'), {
    data: newProduct
  });

  console.log('Status:', response.status());

  const body = await response.json();
  console.log('Resposta da API:', body);

  expect(response.status()).toBe(201);

  expect(body.title).toBe(newProduct.title);
  expect(body.price).toBe(newProduct.price);

  expect(typeof body.title).toBe('string');
  expect(typeof body.price).toBe('number');
});



test('POST - não deve criar produto sem title', async ({ request }) => {

  const invalidProduct = {
    price: 29.99,
    description: "Produto inválido",
    image: "https://images.tcdn.com.br/img/img_prod/1157659/stick_video_game_10_mil_jogos_22994_1_8eee8ae99fa42a4b60b68649bdf7bfbb.png",
    category: "electronics"
  };

  const response = await request.post(getEndpoint('/products'), {
    data: invalidProduct
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});



test('POST - não deve aceitar price como string', async ({ request }) => {

  const invalidProduct = {
    title: "Produto inválido",
    price: "vinte reais",
    description: "Teste inválido",
    image: "https://images.tcdn.com.br/img/img_prod/1157659/stick_video_game_10_mil_jogos_22994_1_8eee8ae99fa42a4b60b68649bdf7bfbb.png",
    category: "electronics"
  };

  const response = await request.post(getEndpoint('/products'), {
    data: invalidProduct
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});