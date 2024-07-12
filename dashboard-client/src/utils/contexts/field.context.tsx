import { createContext } from 'react';

type FieldsContextType = {
    fields?: string[];
    setFields: (fields: string[]) => void;
};

export const FieldsContext = createContext<FieldsContextType>({
    setFields: () => {},
});