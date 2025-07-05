import { createContext, useContext, useEffect } from 'react';

type FieldsContextType = {
    fields?: string[];
    setFields: (fields?: string[]) => void;
};

class FieldsContext {
    private readonly _context = createContext<FieldsContextType>({
        setFields: () => {},
    });

    public setContext = (fields?: string[]) => {
        const { setFields } = useContext(this._context);

        useEffect(() => {
            setFields(fields);
        }, []);
    };
    
    public readonly getContext = () => {
        const context = useContext(this._context);

        return context;
    };

    get context() {
        return this._context;
    };
};

export default FieldsContext;