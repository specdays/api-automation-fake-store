const { test, expect } = require('@playwright/test');
const { getEndpoint } = require('../helpers/apiClient');


test('PUT - deve atualizar um produto existente', async ({ request }) => {

  const updatedProduct = {
    id: 1,
    title: "Produto Atualizado QA",
    price: 99.99,
    description: "Produto atualizado via automação",
    image: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/620097/Fone-De-Ouvido-Bluetooth-Headset-Sem-Fio-Com-Modo-Caixa-De-Som-verde-_1723486250_gg.jpg",
    category: "electronics"
  };

  console.log('Enviando atualização:', updatedProduct);

  const response = await request.put(getEndpoint('/products/1'), {
    data: updatedProduct
  });

  console.log('Status:', response.status());

  const body = await response.json();
  console.log('Resposta da API:', body);

  expect(response.status()).toBe(200);

  expect(body.title).toBe(updatedProduct.title);
  expect(body.price).toBe(updatedProduct.price);
  expect(body.image).toBe(updatedProduct.image);
});



test('PUT - não deve atualizar produto inexistente', async ({ request }) => {

  const updatedProduct = {
    id: 999999,
    title: "Produto Fantasma",
    price: 50,
    description: "Não existe",
    image: "https://i.pravatar.cc",
    category: "electronics"
  };

  const response = await request.put(getEndpoint('/products/999999'), {
    data: updatedProduct
  });

  console.log('Status:', response.status());

  expect(response.status()).toBe(404);
});