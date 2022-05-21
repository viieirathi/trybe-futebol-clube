import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { describe } from 'mocha';
import Teams from '../database/models/teams';
import { mockTeams } from './mock/mockTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa as rotas /Teams', () => {

    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Teams, "findAll")
        .resolves(mockTeams as Teams[]);
    });
  
    after(() => {
      (Teams.findAll as sinon.SinonStub).restore();
    });
    describe('Testando rota /teams metodo GET', () => {
      it('Testando se é retornado todos os times', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams').send();
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams);
      });
    });
  
    describe('Testando rota /teams/:id', async () => {
  
      let chaiHttpResponse: Response;
  
      before( async () => {
        sinon
        .stub(Teams, "findOne")
        .resolves(mockTeams[0] as Teams);
      });
      
      after(() => {
        (Teams.findOne as sinon.SinonStub).restore();
      });
  
      it('Testando se é retornado o time por id', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/1');
  
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body.id).to.be.equal(1);
      });
    });
  });