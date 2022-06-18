import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamModel';
import { MockTeams } from './mocks/teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect, assert } = chai;

describe('Testando a rota de teams', () => {
  describe('Consegue mostar todos os times', () => {
  let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get("/teams")
      .send()

      sinon
      .stub(Teams, "findAll")
      .resolves(MockTeams as unknown as Teams[]);
    });

    after(() => {
      (Teams.findAll as sinon.SinonStub).restore();
    })

    
    it('Retorna status 200', async () => {     
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('Retorna o time através da requisição', () => {
      expect(chaiHttpResponse).not.to.be.undefined;
    });
    it('Retorna um array', () => {
      assert.typeOf(MockTeams, 'array');
    });
  });

  describe('Consegue retorna um time pelo seu id', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get("/teams/1")
      .send()

      sinon
      .stub(Teams, "findOne")
      .resolves(MockTeams[0] as unknown as Teams);
    });

    after(() => {
      (Teams.findOne as sinon.SinonStub).restore();
    })

    it('Retorna status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
})