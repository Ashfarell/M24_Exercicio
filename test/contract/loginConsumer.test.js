const { spec } = require('pactum');

describe('CONTRACT - Login Consumer', function () {

  // aumenta timeout para evitar problemas de rede
  this.timeout(10000);

  it('deve autenticar o usuário corretamente', async () => {

    await spec()
      .post('http://lojaebac.ebaconline.art.br/public/authUser')
      .withJson({
        email: "admin@admin.com",
        password: "admin123"
      })
      .expectStatus(200)
      .expectJsonLike({
        success: true,
        data: {
          token: /.+/
        }
      });

  });

});
