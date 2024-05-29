import docStyles from '@/src/pages/documentation/index.module.scss';
import config from '@/config.json'

export default
{
    "documentation":
        <div>
            <div className={docStyles.hello_text}>
                <h3>Привет! Здесь написана главная информация о нашем сайте и боте!</h3>
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
};