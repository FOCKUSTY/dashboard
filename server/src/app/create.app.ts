import { config } from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import routes from '../routes';
import Passport from '../strategies/discord';
import Session from './session.app';

config();
require('../strategies/discord');

class App {
    private readonly _app: Express;
    private readonly _passport = new Passport();
    private readonly _session: Session;

    protected readonly _port: string|number = process.env.PORT || 3001;
    protected readonly _client_url: string = `${process.env.CLIENT_URL}`;

    constructor() {
        this._app = express();
        this._session = new Session('AZXVHklsadbgoisKJBNXilak', this._app);

        this.init();
    };

    private init = () => {
        try {
            this._app.use(cors({  origin: [ this._client_url ], credentials: true }));
            this._app.use(express.json());
            this._app.use(express.urlencoded());
        
            this._session.create();

            this._app.use(this._passport.session());
            this._app.use(this._passport.initialize());
            
            this._app.use((_req, _res, next) => setTimeout(() => next(), 700));
            this._app.use('/api', routes);   
        } catch (err) {
            console.log(err);
            return;
        };
    };

    public listen = () => {
        try {
            this._app.listen(this._port, () =>
                console.log(`Запускаю на порте ${this._port}\nhttp://localhost:${this._port}`));   
        } catch (err) {
            console.log(err);
            return;
        };
    };
};

export default App;