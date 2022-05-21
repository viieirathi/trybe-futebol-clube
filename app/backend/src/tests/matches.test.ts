import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { matchesTest, tokenAuthorization } from './mock/mockMatches';
import { app } from '../app';
import { Response } from 'superagent';
import { describe } from 'mocha';
import Matches from '../database/models/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste das rotas Matches', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
     .stub(Matches, "findAll")
     .resolves(matchesTest as unknown as Matches[]);
  });
  after(() => {
    sinon.restore();
  });
  describe('Teste do método get Matches', () => {
    it('Trazendo todas partidas', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches').send();
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesTest);
    });
    it('Testando retorno de status ', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches').send();
      expect(chaiHttpResponse).to.have.status(200);
    });
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
      chaiHttpResponse = await chai.request(app).post('/matches')
      .set('Authorization', tokenAuthorization)
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
});