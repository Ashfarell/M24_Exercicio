const { spec } = require('pactum');

describe('CONTRACT - Login Provider', function () {

  this.timeout(10000);

  it('deve respeitar o contrato de autenticação', async () => {

    const response = await spec()
      .post('http://lojaebac.ebaconline.art.br/public/authUser')
      .withJson({
        email: "admin@admin.com",
        password: "admin123"
      })
      .expectStatus(200);

    if (!response.body.success) {
      throw new Error('Contrato inválido: success não é true');
    }

    if (!response.body.data.token) {
      throw new Error('Contrato inválido: token não retornado');
    }

  });

});
