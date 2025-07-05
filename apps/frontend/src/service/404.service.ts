import { AnimationEvent } from "react";
import PseudoRandom from "./pseudo-random.service";

class Animation404 {
    private readonly _pseudo_randomF: PseudoRandom = new PseudoRandom({name: '404F', logging: false, min: 300, max: 3000});;
    private readonly _pseudo_randomS: PseudoRandom = new PseudoRandom({name: '404S', logging: false, min: 720, max: 3600});;
    
    private readonly _styles: any;

    constructor(styles: any) {
        this._styles = styles;
    };

    public readonly execute = (e: AnimationEvent, started: boolean) => {
        if(started)
            return;

        started = true;
        
        const document = e.currentTarget.ownerDocument;
        const element = document.getElementById(this._styles.hat);

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
            const randomF = this._pseudo_randomF.execute();
            const randomS = this._pseudo_randomS.execute();

            element.style.cssText = `transition: 2s ease-in-out;
                opacity: 1;

                right: 0;
                top: -450px;
                rotate: 0deg;
                -webkit-filter: blur(0px);

                rotate: ${randomS}deg;
            `;

            setTimeout(() => {
                element.style.cssText = `transition: 2s ease-in-out;
                    opacity: 1;
    
                    right: 1000px;
                    top: ${randomF}px;
                    
                    -webkit-filter: blur(3px);
                `;
            }, 1500);

            setTimeout(() => {
                element.style.cssText = `transition: 0.5s ease-in-out;
                    opacity: 1;
    
                    filter: blur(10px);
            
                    rotate: ${randomS*Math.random()}deg;
                    top: ${randomF}px;
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
};

export default Animation404;