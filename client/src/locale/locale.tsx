import { FC } from "react";
import localizations from './index';

import type {
    Language,
    TranslatedTexts
} from "types/locale.types";

const locales: any = localizations;

type Props<T extends string> = {
    type: TranslatedTexts;
    language: Language<T>;
};

class Locale<T extends ''> {
    public readonly getComponentTranslatedText: FC<Props<T>> = ({ type, language }) => {
        const component = locales[language][type];

        return component;
    };

    public getTranslatedText<T extends string>(type: TranslatedTexts, language: Language<T>) {
        const text = locales[language][type];

        return text;
    };
};

export default Locale;