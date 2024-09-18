type CreateHandlerType = {
    count: number,
    attacments: string[],
    maxAttacments: number,
    setAttachment: (value: any) => void,
    setCount: (value: number) => void,
    id?: string,
    fields?: { [key: string]: string[] };
};

class Handler {
    public readonly handler = (data: CreateHandlerType) => {
        if(data.attacments.length === data.maxAttacments) return;
    
        data.setCount(data.count+1);
    
        const fields: { [key: string]: string[] } = {};
    
        for(let i = 1; i <= 10; i++) {
            fields[i] = data.fields
                ? data.fields[i]
                : [];
        };
    
        if(data.id) {
            const index = `${Number(data.id)+1}`;
            fields[index] = [...data.attacments, `${data.count}`];
    
            data.setAttachment(fields);
        } else {
            data.setAttachment([...data.attacments, `${data.count}`]);
        };
    };
};

export default Handler;