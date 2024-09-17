type DataDeleteType = {
    id: string;
    
    attacments: string[];
    _fields: { [key: string]: string[] };
    
    setAttachment: (value: any) => void;
    setField: (value: any) => void
};

type DataDeleteFieldType = {
    id: string;
    embedId: string;
    _fields: { [key: string]: string[] };
    setField: (value: any) => void;
};

class Handler {
    public readonly delete = (data: DataDeleteType) => {
        const fields: { [key: string]: string[] } = {};
    
        for(let i = 1; i <= 10; i++)
            fields[i] = data._fields[i] || [];
     
        const index = Number(data.id);
        
        fields[index+1] = [];
        data.setField(fields);
    
        if(!data.attacments)
            return;
        
        if(data.attacments.length === 1)
            return data.setAttachment([]);
         
        if(index === 0)
            return data.setAttachment([...data.attacments.slice(1, data.attacments.length+1)]);
        
        if(index === data.attacments.length-1)
            return data.setAttachment([...data.attacments.slice(0, index)]);
    
        return data.setAttachment([...data.attacments.slice(0, index), ...data.attacments.slice(index+1)]);
    };

    public readonly deleteField = (data: DataDeleteFieldType) => {
        const index = Number(data.id);
        const fields: { [key: string]: string[] } = {};
    
        const fieldIndex = Number(data.embedId)+1;

        for(let i = 1; i <= 10; i++)
            fields[i] = data._fields[i] || [];
    
        const currentFields = fields[fieldIndex];
    
        if(!fields[fieldIndex])
            return;
        
        else if(fields[fieldIndex].length === 1)
            fields[fieldIndex] = [];
        
        else if(index === 0)
            fields[fieldIndex] = [...currentFields.slice(1, currentFields.length+1)];
        
        else if(index === fields[fieldIndex].length-1)
            fields[fieldIndex] = [...currentFields.slice(0, index)];
    
        else
            fields[fieldIndex] = [...currentFields.slice(0, index), ...currentFields.slice(index+1)];
    
        return data.setField(fields);
    };
};

export default Handler;