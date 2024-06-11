import { createContext } from 'react';

type fieldsContextType = {
    fields?: string[];
    setFields: (fields: string[]) => void;
};

export const FieldsContext = createContext<fieldsContextType>({
    setFields: () => {},
});