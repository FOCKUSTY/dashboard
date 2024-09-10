import { Express } from 'express';
import session from 'express-session';
import store from 'connect-mongo';

class Session {
    private _secret: string;
    private _app: Express;

    private _resave: boolean = false;
    private _saveUninitialized: boolean = false;
    private _cookie: { maxAge: number } = { maxAge: 60000 * 60 * 24 * 7 };
    private _mongo_url: string = 'mongodb://127.0.0.1/dashboard';

    constructor(
        secret: string,
        app: Express,
        data?: {
            resave?: boolean,
            saveUninitialized?: boolean,
            cookie?: { maxAge: number },
            mongoUrl?: string
        }
    ) {
        this._secret = secret;
        this._app = app;

        this._resave = data?.resave || this._resave;
        this._saveUninitialized = data?.saveUninitialized || this._saveUninitialized;
        this._cookie = data?.cookie || this._cookie;
        this._mongo_url = data?.mongoUrl || this._mongo_url;
    };

    public create = () => {
        this._app.use(session({
            secret: this._secret,
            resave: this._resave,
            saveUninitialized: this._saveUninitialized,
            cookie: this._cookie,
            store: store.create({
                mongoUrl: this._mongo_url
            })
        }));
    };
};

export default Session;