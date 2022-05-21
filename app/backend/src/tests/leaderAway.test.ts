import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { matchesLeaderboardAway } from './mock/mockMatches';
import { app } from '../app';
import { Response } from 'superagent';
import { describe } from 'mocha';
import Matches from '../database/models/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste rota /Leaderboard/home', () => {

    let chaiHttpResponse: Response;

    before( async () => {
      sinon.stub(Matches, "findAll")
      .resolves(matchesLeaderboardAway as unknown as Matches[]);
    });
      after(() => {
        sinon.restore();
      });
  
    it('Verificando se a rota traz as estatisticas do time', async () => {

      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

      expect(chaiHttpResponse.body).to.be.deep.include({
		name: "Santos",
		totalPoints: 2,
		totalGames: 2,
		totalVictories: 0,
		totalDraws: 2,
		totalLosses: 0,
		goalsFavor: 3,
		goalsOwn: 3,
		goalsBalance: 0,
		efficiency: 33.33,
	});
    });
    it('Verificando se a rota traz o staus 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

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
  });
