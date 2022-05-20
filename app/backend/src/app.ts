import * as express from 'express';
import * as cors from 'cors';
import loginRouter from './database/routes/login.routes';
import teamsRouter from './database/routes/teams.routes';
import matchesRouter from './database/routes/matches.routes';
import leaderHome from './database/routes/leaderHome.routes';
import leaderAway from './database/routes/leaderAway.routes';
import leaderAll from './database/routes/leaderAll.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamsRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard', leaderHome, leaderAway, leaderAll);
    this.app.use(cors());
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.listen(PORT, () => { console.log(PORT); });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
