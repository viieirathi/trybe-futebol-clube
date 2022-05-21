import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { matchesLeaderboardHome } from './mock/mockMatches';
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
      .resolves(matchesLeaderboardHome as unknown as Matches[]);
    });

      after(() => { 
        sinon.restore(); 
      });
   
    it('Verificando se a rota traz as estatisticas do time', async () => {
  
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
      
      expect(chaiHttpResponse.body).to.be.deep.include({
        name: "Santos",
        totalPoints: 9,
        totalGames: 3,
        totalVictories: 3,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 9,
        goalsOwn: 3,
        goalsBalance: 6,
        efficiency: 100
      });
    });
    it('Verificando se a rota traz o staus 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
  
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('Verificando se o retorno do objeto traz as chaves corretas na rota', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
  
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
