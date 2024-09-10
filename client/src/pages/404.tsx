import styles from '../utils/styles/404.module.scss';
import { pseudoRandomNumber } from '../utils/random';
import { AnimationEvent } from 'react';
import { useRouter } from 'next/router';
import { t } from '../utils/helpers'

const page404 = () =>
{
    let started = false;

    const router = useRouter();
    const l: string = router.locale || 'ru';

    const animationEnd = (e: AnimationEvent) =>
    {
        if(started)
            return;

        started = true;
        
        const document = e.currentTarget.ownerDocument;
        const element = document.getElementById(styles.hat);

        if(!element)
            return;

        element.style.cssText = `transition: 2s;
            opacity: 1;

            right: 0;
            top: -450px;
            rotate: 0deg;
            -webkit-filter: blur(0px);
        `;

        setInterval(() => {
            const random = pseudoRandomNumber(300, 3000, 0, 0, undefined, undefined, undefined, undefined, false, false);
            const random2 = pseudoRandomNumber(720, 3600, 0, 0, undefined, undefined, undefined, undefined, false, false);

            element.style.cssText = `transition: 2s ease-in-out;
                opacity: 1;

                right: 0;
                top: -450px;
                rotate: 0deg;
                -webkit-filter: blur(0px);

                rotate: ${random2}deg;
            `;

            setTimeout(() => {
                element.style.cssText = `transition: 2s ease-in-out;
                    opacity: 1;
    
                    right: 1000px;
                    top: ${random}px;
                    
                    -webkit-filter: blur(3px);
                `;
            }, 1500);

            setTimeout(() => {
                element.style.cssText = `transition: 0.5s ease-in-out;
                    opacity: 1;
    
                    filter: blur(10px);
            
                    rotate: ${random2*Math.random()}deg;
                    top: ${random}px;
                    right: 1000px;
                    
                    width: 0%;
                    
                    -webkit-filter: blur(3px);
                `
            }, 3500);

            setTimeout(() => {
                element.style.cssText = `transition: 0.5s ease-in-out;
                    opacity: 0;
    
                    right: 0;
                    top: -450px;
                    rotate: 0deg;
                    -webkit-filter: blur(0px);
                    
                    width: 0%;
                `
            }, 4500)
        }, 5000);
    };
    
    return (
        <div className={`page ${styles.page}`}>
            <div id={styles.background}></div>
            <div className={styles.human_container}><img id={styles.human} src="/human.png"/></div>
            <img id={styles.hat} src="/hat.png" onAnimationEnd={(e)=>animationEnd(e)}/>
            
            <div className={`aligned-center ${styles.aligned_center}`}>
                <div className={styles.container}>
                    <p>404 {t('Мы пытались найти страницу, но нашли котика', l)} :3</p>
                </div>
            </div>
        </div>
    );
};

export default page404;