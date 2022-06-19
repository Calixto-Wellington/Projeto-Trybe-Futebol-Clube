import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UserModel';
import { mockUsers, MockResponse } from './mocks/login';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect, assert } = chai;

describe('Teste na rota de login', () => {
  describe('Login sucesso', () => {
  let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: 'admin@admin.com', password:'secret_admin'})

      sinon
      .stub(Users, "findOne")
      .resolves(mockUsers[0] as Users);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })

    
    it('Status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('Recebe os dados da pessoa usuária, retornando os dado e o token', () => {
      const { user, token } = chaiHttpResponse.body;
      expect(chaiHttpResponse).not.to.be.undefined;;
    });
    it('Traz o objeto', () => {
      assert.typeOf(MockResponse, 'object');
    });
  });
  describe('Se o email está incorreto', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: 'admin@admin', password:'secret_admin'})

      sinon
      .stub(Users, "findOne")
      .resolves(mockUsers[0] as Users);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Retorna status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
  });
  describe('Se a senha está incorreta', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: 'admin@admin', password:'secret_admin'})

      sinon
      .stub(Users, "findOne")
      .resolves(mockUsers[0] as Users);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Retorna status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
  });
  describe('body vazio', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({})

      sinon
      .stub(Users, "findOne")
      .resolves(mockUsers[0] as Users);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Retorna status 400', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });
  });
});