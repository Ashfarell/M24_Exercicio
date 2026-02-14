const { spec } = require('pactum');

let token;
let categoryId;

describe('API - Delete Category', () => {

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
        name: "Categoria Para Deletar"
      })
      .expectStatus(200);

    categoryId = response.body.data._id;
    console.log('Categoria criada:', categoryId);
  });

  // 🗑️ DELETE
  it('deve deletar a categoria com sucesso', async () => {
    await spec()
      .delete(`http://lojaebac.ebaconline.art.br/api/deleteCategory/${categoryId}`)
      .withHeaders('Authorization', token)
      .expectStatus(200)
      .expectJsonLike({
        success: true
      });
  });

});
