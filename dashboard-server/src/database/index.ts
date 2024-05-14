import mongoose from "mongoose";

mongoose
    .connect('mongodb://127.0.0.1/discord_dashboard')
    .then(() => console.log('Подлючен к базе данных'))
    .catch((err) => console.error(err));