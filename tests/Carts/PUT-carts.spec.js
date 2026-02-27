const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');

test.describe('Carts API - PUT', () => {

  test('deve atualizar um carrinho existente', async ({ request }) => {

    const updatedCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02",
      products: [
        { productId: 1, quantity: 10 }
      ]
    };

    const response = await request.put(getEndpoint('/carts/1'), {
      data: updatedCart
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(Array.isArray(body.products)).toBeTruthy();
  });


  test('PUT - não deve atualizar carrinho inexistente', async ({ request }) => {

  const updatedCart = {
    id: 999999,
    userId: 1,
    date: "2020-03-02",
    products: [
      { productId: 1, quantity: 10 }
    ]
  };

  const response = await request.put(getEndpoint('/carts/999999'), {
    data: updatedCart
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(404);

});


test('PUT - não deve atualizar carrinho com body vazio', async ({ request }) => {

  const response = await request.put(getEndpoint('/carts/1'), {
    data: {}
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});

});