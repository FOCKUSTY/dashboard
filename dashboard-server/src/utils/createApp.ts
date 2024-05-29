import { config } from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import routes from '../routes';
import store from 'connect-mongo';

config();
require('../strategies/discord');

export function createApp(): Express {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded());

    app.use(cors({  origin: [`${process.env.CLIENT_URL}`], credentials: true }));

    app.use(session({
        secret: 'AOFSDasfdAIASGxcghnxgchFIGAFOJDAAZXZZPOPPOASZGSsadgsaweawqKGIOPASGDWHSGLsdgvohOUAHJLAZHVJHASJHBzxvczxvcbzxdfszzedgzxfxOSFZXVLOJ',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 60 * 24 * 7 },
        store: store.create({
            mongoUrl: 'mongodb://127.0.0.1/discord_dashboard'
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => setTimeout(() => next(), 700));

    app.use('/api', routes);

    return app;
}