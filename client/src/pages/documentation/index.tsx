import styles from './index.module.scss';

import { useRouter } from "next/router";
import type { NextPage } from "next";

import Locale from '../../locale/locale';

const DocumentationPage: NextPage = () => {
    const router = useRouter();
    const l = router.locale || 'ru'

    const TranslatedText = new Locale().TranslatedText;

    return (
        <div className={`page ${styles.page}`}>
            <div className={`aligned-center ${styles.aligned_center}`}>
                <div className={styles.info}>
                    <TranslatedText type="documentation" language={l}/>
                </div>  
            </div>
        </div>
    );
};

export default DocumentationPage;