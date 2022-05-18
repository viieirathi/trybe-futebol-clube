import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { matchesTest, tokenAuthorization } from './mock/mockMatches';

import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/users';
import { describe } from 'mocha';
import Matches from '../database/models/matches';
import { send } from 'process';

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
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjUyODgxNzM3LCJleHAiOjE2NTI5NjgxMzd9.oRSTgEM9pckfqzSFfk4cazfXq7XSaaYZQVbv_Rk3i74')
    .send();
    expect(chaiHttpResponse.body).to.be.deep.equal('admin');
  });
});
});

describe('Teste das rotas Matches', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
     .stub(Matches, "findAll")
     .resolves(matchesTest as unknown as Matches[]);
  });
  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  });
  describe('Teste do método get Matches', () => {
    it('Trazendo todas partidas', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches').send();
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesTest);
    });
    it('Testando retorno de status ', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches').send();
      expect(chaiHttpResponse).to.have.status(200);
    })
    it('Retorna apenas partidas finalizadas', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesTest);
    });
  });

  describe('Teste da rota /Matches método POST', () => {
    before(async () => {
      sinon
        .stub(Matches, "create")
        .resolves({
          id: 49,
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true,
        } as Matches)
    });

    after(() => {
      (Matches.create as sinon.SinonStub).restore();
    });
    it('Testando retorno de uma criação de partida', async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').set('Authorization', tokenAuthorization)
      .send({
        "homeTeam": 16, 
        "awayTeam": 8, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      });
      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        id: 49,
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
      });
    });
    it('Testando se o retorno da rota /post traz um objeto', async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').set('Authorization', tokenAuthorization)
      .send({
        "homeTeam": 16, 
        "awayTeam": 8, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      });
      expect(chaiHttpResponse.body).to.be.an('object');
    });
  });
})