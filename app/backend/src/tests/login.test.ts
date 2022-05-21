import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { tokenAuthorization } from './mock/mockMatches';
import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/users';
import { describe } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes das rotas Login', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
          id: 1,
          username: "Admin",
          role: "admin",
          email: "admin@admin.com",
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as Users);
  });

  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })

  describe('Testando método post', () => {
    it('Caso não exista o e-mail retornar', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ password: 'secret_admin' });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
    });
    it('Caso não exista o password retornar', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
    it('Quando Email é passado de forma incorreta retornar', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'admin', password: 'secret_admin'});
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
    });
    it('Quando password é passado de forma incorreta retorna', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret' });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Testando método get /validate', () => {
    it('Quando o token não é passado', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').send();
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Token Invalido');
    });
    it('Testando se o retorno da rota /validate traz o role', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', tokenAuthorization)
    .send();
    expect(chaiHttpResponse.body).to.be.deep.equal('admin');
  });
});
});