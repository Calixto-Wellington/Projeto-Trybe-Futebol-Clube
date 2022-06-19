import * as express from 'express';
import LoginRouter from './routes/LoginRoute';
import TeamRouter from './routes/TeamRoute';
import MatchRouter from './routes/MatchRoute';
import LeaderBoardRoute from './routes/LeaderBoardRoute';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use(LoginRouter);
    this.app.use(TeamRouter);
    this.app.use(MatchRouter);
    this.app.use(LeaderBoardRoute);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
