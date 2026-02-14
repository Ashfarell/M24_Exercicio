const { spec } = require('pactum');

let token;
let categoryId;
let productId;

describe('API - Delete Product', () => {

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
        name: "Categoria Delete Test"
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
        name: "Produto para deletar",
        price: 150,
        description: "Produto que será removido",
        quantity: 5,
        category: categoryId
      })
      .expectStatus(200);

    productId = response.body.data._id;
    console.log('Produto criado:', productId);
  });

  // 🗑️ DELETE
  it('deve deletar o produto com sucesso', async () => {
    await spec()
      .delete(`http://lojaebac.ebaconline.art.br/api/deleteProduct/${productId}`)
      .withHeaders('Authorization', token)
      .expectStatus(200)
      .expectJsonLike({
        success: true
      });
  });

});
