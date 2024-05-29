import type { NextPage } from "next";
import styles from './index.module.scss';
import { useRouter } from "next/router";
import { TranslatedText } from '../../utils/locale';

const DocumentationPage: NextPage = () =>
{
    const router = useRouter();
    const l: string = router.locale || 'ru'; 

    return (
        <div className={`page ${styles.page}`}>
            <div className={`aligned-center ${styles.aligned_center}`}>
                <div className={styles.info}>
                    <TranslatedText type="documentation" language={l} />
                </div>  
            </div>
        </div>
    )
};

export default DocumentationPage;