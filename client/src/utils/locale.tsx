import lcls from './locales/locale';
import { Language } from './helpers';
import { FC } from "react";

const localizations: any = lcls;
type TranslatedTexts = 'documentation';

type Props = {
    type: TranslatedTexts,
    language: Language | string
}

export const getTranslatedText = (type: TranslatedTexts, language: Language | string) =>
    localizations[language][type];

export const TranslatedText: FC<Props> = ({ type, language }) =>
    ( localizations[language][type] );