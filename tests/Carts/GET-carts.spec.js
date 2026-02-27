const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');


// teste describe - para organizar vários testes relacionados.
test.describe('Carts API - GET', () => {

  test('GET - deve listar todos os carrinhos', async ({ request }) => {

    const response = await request.get(getEndpoint('/carts'));

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Resposta da API', body);

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    const cart = body[0];

    expect(cart).toHaveProperty('id');
    expect(cart).toHaveProperty('userId');
    expect(cart).toHaveProperty('products');

    expect(Array.isArray(cart.products)).toBeTruthy();
  });


  test('GET - deve buscar carrinho por ID', async ({ request }) => {

    const response = await request.get(getEndpoint('/carts/1'));

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Resposta da API', body);

    expect(body.id).toBe(1);
    expect(typeof body.userId).toBe('number');
    expect(Array.isArray(body.products)).toBeTruthy();

    const product = body.products[0];

    expect(product).toHaveProperty('productId');
    expect(product).toHaveProperty('quantity');

    expect(typeof product.productId).toBe('number');
    expect(typeof product.quantity).toBe('number');
    expect(product.quantity).toBeGreaterThan(0);
  });

});