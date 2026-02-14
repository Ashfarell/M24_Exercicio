const { spec } = require('pactum');

let token;

describe('CONTRACT - Category Service', () => {

  before(async () => {
    const login = await spec()
      .post('http://lojaebac.ebaconline.art.br/public/authUser')
      .withJson({
        email: "admin@admin.com",
        password: "admin123"
      });

    token = login.body.data.token;
  });

  it('deve respeitar o contrato de criação de categoria', async () => {
    await spec()
      .post('http://lojaebac.ebaconline.art.br/api/addCategory')
      .withHeaders('Authorization', token)
      .withJson({
        name: "Categoria Contract Test"
      })
      .expectStatus(200)
      .expectJsonLike({
        success: true,
        data: {
          _id: /.+/,
          name: "Categoria Contract Test"
        }
      });
  });

});
