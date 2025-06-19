import styles from '../../pages/documentation/index.module.scss';
import Api from '../../api/api';

const api = new Api();

export default {
    "documentation": (
        <div>
            <div className={styles.hello_text}>
                <h3>Привет! Здесь написана главная информация о нашем сайте и боте!</h3>
                <h3>Удачи в использовании</h3>
            </div>
            <div className={styles.main_text}>
                <ol className={styles.list}>
                    <li>
                        <p>
                        Для начала Вам нужно зайти на <a className={styles.link} href={`${api.client_url}/ru`}>главную страницу</a> сайта,
                        после нажать на кнопку &#39;Добавить в Discord&#39; или &#39;Войти&#39;
                        </p>
                    </li>
                    
                    <li>
                        <p>После успешного входа, можете нажать на кнопку &#39;Серверы&#39; и перейти в меню выбора Ваших серверов</p>
                    </li>
                </ol>
            </div>
        </div>
    )
};