import styles from '../../pages/documentation/index.module.scss';
import Api from '../../api/api';

const api = new Api();

export default {
    "documentation": (
        <div>
            <div className={styles.hello_text}>
                <h3>Хейле! Туть пiсьмтä стайкнä Iнпва о яiны сайт i бот!</h3>
                <h3>Лайннü пропв, папе юзтö эт</h3>
            </div>
            <div className={styles.main_text}>
                <ol className={styles.list}>
                    <li>
                        <p>
                        В старт, Ню монаттö дi онат <a className={styles.link} href={`${api.client_url}/fe`}>меiннü странiца</a> опв сайт.
                        В нексттü, жмяттö онат кнопка &#39;Регентü дi в Discord&#39; iль &#39;Входтö дi&#39;
                        </p>
                    </li>
                    
                    <li>
                        <p>Таямзе Ню бi входтö, таямсе Ню жмяттö дi кнопка &#39;Сiрвiры&#39;, i Ню монаттö дi в менлiст с нюнü сiрвiр пре прей</p>
                    </li>
                </ol>
            </div>
        </div>
    )
}