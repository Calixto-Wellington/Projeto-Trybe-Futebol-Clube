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
  describe('Quando o login é efetuado com sucesso', () => {
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

    
    it(' Status 200 ok', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('Com os dados do usuário, retorna o login e o token', () => {
      const { user, token } = chaiHttpResponse.body;
      expect(chaiHttpResponse).not.to.be.undefined;
    });
    it(' Um Objeto é retornado', () => {
      assert.typeOf(MockResponse, 'object');
    }); 
  });
  describe('Email incorreto', () => {
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
    
    it('O status 40é retornado', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
  });
  describe('Caso a senha esteja incorreta')
  let chaiHttpResponse: Response;

  before(async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post("/login")
    .send({ email: 'admin@admin', password:'secret_admin'})

    sinon
    .stub(Users, "findOne")
    .resolves(mockUsers[0] as Users)
  });

  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('O status 401', () => {
    expect(chaiHttpResponse).have.status(401);
  });
});
describe('Qaundo o body esta vazio', () => {
  let chaiHttpResponse: Response;

  before(async ()  => {
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

  it('O status 400', () => {
    expect(chaiHttpResponse).to.have.status(400);
  });
});
