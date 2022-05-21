import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { matchesLeaderAll } from './mock/mockMatches';
import { app } from '../app';
import { Response } from 'superagent';
import { describe } from 'mocha';
import Matches from '../database/models/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste rota /Leaderboard', () => {

    let chaiHttpResponse: Response;

    before( async () => {
      sinon.stub(Matches, "findAll")
      .resolves(matchesLeaderAll as unknown as Matches[]);
    });
      after(() => {
        sinon.restore();
      });
  
    it('Verificando se a rota traz as estatisticas do time', async () => {

      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      expect(chaiHttpResponse.body).to.be.deep.include({
        name: "Santos",
        totalPoints: 11,
        totalGames: 5,
        totalVictories: 3,
        totalDraws: 2,
        totalLosses: 0,
        goalsFavor: 12,
        goalsOwn: 6,
        goalsBalance: 6,
        efficiency: 73.33
      });
    });
    it('Verificando se a rota traz o staus 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('Verificando se o retorno do objeto traz as chaves corretas na rota', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

      expect(chaiHttpResponse.body[0]).to.be.keys(
        'name',
        'totalPoints',
        'totalGames',
        'totalVictories',
        'totalDraws',
        'totalLosses',
        'goalsFavor',
        'goalsOwn',
        'goalsBalance',
        'efficiency',
        );
    });
    it('Verificando se o get retorna um array', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
      
      expect(chaiHttpResponse.body).to.be.an('array');
    });
  });
