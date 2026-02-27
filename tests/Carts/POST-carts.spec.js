const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');

test.describe('Carts API - POST', () => {

  test('deve criar um novo carrinho', async ({ request }) => {

    const newCart = {
      userId: 5,
      date: "2020-02-03",
      products: [
        { productId: 5, quantity: 1 }
      ]
    };

    const response = await request.post(getEndpoint('/carts'), {
      data: newCart
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.id).toBeDefined();
    expect(typeof body.id).toBe('number');
    expect(typeof body.userId).toBe('number');
    expect(Array.isArray(body.products)).toBeTruthy();
  });

test('POST - não deve criar carrinho sem userId', async ({ request }) => {

  const invalidCart = {
    date: "2020-02-03",
    products: [
      { productId: 5, quantity: 1 }
    ]
  };

  const response = await request.post(getEndpoint('/carts'), {
    data: invalidCart
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});


test('POST - não deve aceitar quantity negativa', async ({ request }) => {

  const invalidCart = {
    userId: 5,
    date: "2020-02-03",
    products: [
      { productId: 5, quantity: -10 }
    ]
  };

  const response = await request.post(getEndpoint('/carts'), {
    data: invalidCart
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(400);
});

});