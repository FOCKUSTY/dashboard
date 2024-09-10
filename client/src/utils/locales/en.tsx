import docStyles from '@/src/pages/documentation/index.module.scss';
import config from '@/config.json'

export default
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
};