import docStyles from '@/src/pages/documentation/index.module.scss';
import config from '@/config.json'

export default
{
    'ru':
    {
        "documentation":
        <div>
            <div className={docStyles.hello_text}>
                <h3>Привет! Здесь написана главная информация о наших сайте и боте!</h3>
                <h3>Удачи в использовании</h3>
            </div>
            <div className={docStyles.main_text}>
                <ol className={docStyles.list}>
                    <li>
                        <p>
                        Для начала Вам нужно зайти на <a className={docStyles.link} href={`${config.client_url}/ru`}>главную страницу</a> сайта,
                        после нажать на кнопку "Добавить в Discord" или "Войти"
                        </p>
                    </li>
                    
                    <li>
                        <p>После успешного входа, можете нажать на кнопку "Серверы" и перейти в меню выбора Ваших серверов</p>
                    </li>
                </ol>
            </div>
        </div>
    },
    'en':
    {
        "documentation":
        <div>
            <div className={docStyles.hello_text}>
                <h3>Hello! Here written main information about our site and bot</h3>
                <h3>Good luck in use</h3>
            </div>
            <div className={docStyles.main_text}>
                <ul className={docStyles.list}>
                    <li>
                        <p>
                        To start you must open <a className={docStyles.link} href={`${config.client_url}/en`}>main page</a> of site
                        then click on button "Add to Discord" or "Sign in"
                        </p>
                    </li>

                    <li>
                        <p>After success login, you can click on button "Servers" and go to menu for selecting your servers</p>
                    </li>
                </ul>
            </div>
        </div>
    },
    'fe':
    {
        "documentation":
        <div>
            <div className={docStyles.hello_text}>
                <h3>Хейле! Туть пiсьмтä стайкнä Iнпва о яiны сайт i бот!</h3>
                <h3>Лайннü пропв, папе юзтö эт</h3>
            </div>
            <div className={docStyles.main_text}>
                <ol className={docStyles.list}>
                    <li>
                        <p>
                        В старт, Ню монаттö дi онат <a className={docStyles.link} href={`${config.client_url}/fe`}>меiннü странiца</a> опв сайт.
                        В нексттü, жмяттö онат кнопка "Регентü дi в Discord" iль "Входтö дi"
                        </p>
                    </li>
                    
                    <li>
                        <p>Таямзе Ню бi входтö, таямсе Ню жмяттö дi кнопка  "Сiрвiры", i Ню монаттö дi в менлiст с нюнü сiрвiр пре прей</p>
                    </li>
                </ol>
            </div>
        </div>
    }
}