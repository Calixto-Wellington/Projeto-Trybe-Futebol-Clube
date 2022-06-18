import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchModel';

import { mockMatches, Mockpatch } from './mocks/matches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect, assert } = chai;

describe('Testando a rota matches', () => {
  describe('A rota é capaz de retornar todas as partidas', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/matches")
        .send()

      sinon
        .stub(Matches, "findAll")
        .resolves(mockMatches[0] as unknown as Matches[]);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })


    it('Existe retorno', () => {
      expect(chaiHttpResponse).not.to.be.undefined;
    });
    it('Retorna status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('Retorna um um array', () => {
      assert.typeOf(mockMatches, 'array');
    });
  });

  describe('Finaliza as partidas através do id recebido corretamente', async () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, 'update')
        .resolves()

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
    });

    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    });

    it('Retorna status 200, a mensage Finished', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished' })
      expect(chaiHttpResponse).to.have.status(200)
    });
  });

  describe('Edita os gols da partida de acordo com o id do time', async () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, 'update')
        .resolves()

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .send(Mockpatch)
    });

    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    });

    it('Retorna status 200 com a mensagem correta', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "operation performed successfully!" });
      expect(chaiHttpResponse).to.have.status(200);
    })
  });
});