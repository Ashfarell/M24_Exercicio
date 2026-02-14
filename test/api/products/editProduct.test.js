const { spec } = require('pactum');

let token;
let categoryId;
let productId;

describe('API - Edit Product', () => {

  // 🔐 LOGIN
  before(async () => {
    const response = await spec()
      .post('http://lojaebac.ebaconline.art.br/public/authUser')
      .withJson({
        email: "admin@admin.com",
        password: "admin123"
      })
      .expectStatus(200);

    token = response.body.data.token;
    console.log('Token:', token);
  });

  // 📁 CRIAR CATEGORIA
  before(async () => {
    const response = await spec()
      .post('http://lojaebac.ebaconline.art.br/api/addCategory')
      .withHeaders('Authorization', token)
      .withJson({
        name: "Categoria Edit Test"
      })
      .expectStatus(200);

    categoryId = response.body.data._id;
    console.log('Categoria criada:', categoryId);
  });

  // 🛒 CRIAR PRODUTO
  before(async () => {
    const response = await spec()
      .post('http://lojaebac.ebaconline.art.br/api/addProduct')
      .withHeaders('Authorization', token)
      .withJson({
        name: "Produto Original",
        price: 100,
        description: "Produto antes do update",
        quantity: 10,
        category: categoryId
      })
      .expectStatus(200);

    productId = response.body.data._id;
    console.log('Produto criado:', productId);
  });

  // ✏️ EDITAR PRODUTO
  it('deve atualizar o produto com sucesso', async () => {
    await spec()
      .put(`http://lojaebac.ebaconline.art.br/api/editProduct/${productId}`)
      .withHeaders('Authorization', token)
      .withJson({
        name: "Produto Atualizado",
        price: 200,
        description: "Produto depois do update",
        quantity: 20,
        category: categoryId
      })
      .expectStatus(200)
      .expectJsonLike({
        success: true
      });
  });

});
