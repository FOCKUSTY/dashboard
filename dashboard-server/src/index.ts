import { config } from 'dotenv';
import { createApp } from './utils/createApp';
import './database';

config();

const PORT = process.env.PORT || 3001;
const environment = process.env.NODE_ENV || 'development';

const main = async () =>
{
    console.log(`Запуск в режиме ${environment}`);

    try
    {
        const app = createApp();
        app.listen(PORT, () => console.log(`Запускаю на порте ${PORT}\nhttp://localhost:${PORT}`));
    }
    catch (err)
    {
        console.error(err);
    };
};

main();