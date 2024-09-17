import localizations from 'locale/locales.json';
import type { Language } from "types/locale.types";

const locales: {
    [key: string]: {
        [key: string]: string
    }
} = localizations;

const variables: string[] = [];

class Locale<T extends string> {
    private readonly _language: Language<T>;

    constructor(language: Language<T>) {
        this._language = language === 'default'
            ? 'ru'
            : language;
    };

    public readonly translate = (text: string, variable?: string) => {
        if(!locales)
            return;
        
        const l = locales[text];
        
        const output: string = this._language
            ? l[this._language] || text
            : l['ru'];
    
        if(!variable)
            return output;
    
        let vbl: string = '';
        
        variables.forEach((v: string) =>
            text.includes(v)
                ? vbl = v
                : vbl = 'none'
            );
    
        return vbl != 'none'
            ? output.replace(vbl, variable)
            : output;
    };
};

export default Locale;