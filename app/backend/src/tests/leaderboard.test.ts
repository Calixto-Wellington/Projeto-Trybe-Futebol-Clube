import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchModel';
import { leaderboardResolves } from './mocks/leaderboard';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect, assert } = chai;

describe('Testando a rota leaderboard', () => {
  describe('Organiza o array por onde da casa', () => {
  let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get("/leaderboard/home")
      .send()

      sinon
      .stub(Matches, "findAll")
      .resolves(leaderboardResolves[0] as unknown as Matches[]);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })

    
    it('Retorna status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('Recebe os dados da pessoa usuária, retornando os dado e o token', () => {
      const { user, token } = chaiHttpResponse.body;
      expect(chaiHttpResponse).not.to.be.undefined;;
    });
    it('Retorna um array', () => {
      assert.typeOf(leaderboardResolves, 'array');
    });
  });
})