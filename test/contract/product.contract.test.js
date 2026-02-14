const { spec } = require('pactum');

let token;
let categoryId;

describe('CONTRACT - Product Service', () => {

  before(async () => {
    const login = await spec()
      .post('http://lojaebac.ebaconline.art.br/public/authUser')
      .withJson({
        email: "admin@admin.com",
        password: "admin123"
      });

    token = login.body.data.token;

    const category = await spec()
      .post('http://lojaebac.ebaconline.art.br/api/addCategory')
      .withHeaders('Authorization', token)
      .withJson({ name: "Categoria Contract" });

    categoryId = category.body.data._id;
  });

  it('deve respeitar o contrato de criação de produto', async () => {
    await spec()
      .post('http://lojaebac.ebaconline.art.br/api/addProduct')
      .withHeaders('Authorization', token)
      .withJson({
        name: "Produto Contract",
        price: 100,
        description: "Contrato",
        quantity: 10,
        category: categoryId
      })
      .expectStatus(200)
      .expectJsonLike({
        success: true,
        data: {
          _id: /.+/,
          name: "Produto Contract",
          price: 100
        }
      });
  });

});
