import { Router } from "express";
import passport from "passport";

import Api from "../../api/api";

const api = new Api();
const router = Router();

router.get('/discord', passport.authenticate('discord'), (req, res) => {
    res.status(200).send(200);
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    console.log(api.client_url);
    res.redirect(`${api.client_url}`);
});

router.get(':guildId/discord', passport.authenticate('discord'), (req, res) => {
    console.log(api.client_url);
    res.redirect(`${api.client_url}/dashboard/${req.query.guild_id}`);
});

router.get('/status', (req, res) => {
    return req.user
        ? res.status(200).send(req.user)
        : res.status(401).send({ msg: 'Unauthtorized' });
});

export default router;