import styles from 'styles/404.module.scss';

import { useRouter } from 'next/router';
import Image from 'next/image';

import Locale from 'service/locale.service';
import Animation404 from 'service/404.service';

const Page404 = () => {
    let started = false;

    const animation = new Animation404(styles);
    const router = useRouter();
    const t = new Locale(router.locale || 'ru').translate;
    
    return (
        <div className={`page ${styles.page}`}>
            <div id={styles.background}></div>
            <div className={styles.human_container}><Image alt='human' id={styles.human} src="/human.png"/></div>
            <Image alt='hat' id={styles.hat} src="/hat.png" onAnimationEnd={(e) => animation.execute(e, started)}/>
            
            <div className={`aligned-center ${styles.aligned_center}`}>
                <div className={styles.container}>
                    <p>404 {t('Мы пытались найти страницу, но нашли котика')} :3</p>
                </div>
            </div>
        </div>
    );
};

export default Page404;