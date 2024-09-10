import { config } from 'dotenv';
import App from './app/create.app';

import './database';

config();

const environment = process.env.NODE_ENV || 'development';

const main = async () => {
    console.log(`Запуск в режиме ${environment}`);

    try {
        new App().listen();
    }
    catch (err) {
        console.error(err);
    };
};

main();