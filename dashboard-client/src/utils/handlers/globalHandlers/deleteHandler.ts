export const deleteHandler = (id: string, attacments: string[], setAttachment: (value: any) => void, _fields: any, setField: (value: any) => void) =>
{
    const fields: any = {};
    
    for(let i = 1; i <= 10; i++)
        fields[`${i}`] = _fields[`${i}`] || [];
    
    fields[`${Number(id)+1}`] = [];
    setField(fields);

    if(!attacments)
        return;
    
    if(attacments.length === 1)
        return setAttachment([]);
 
    const index = Number(id);

    if(index === 0)
        return setAttachment([...attacments.slice(1, attacments.length+1)]);
    
    if(index === attacments.length-1)
        return setAttachment([...attacments.slice(0, index)]);

    return setAttachment([...attacments.slice(0, index), ...attacments.slice(index+1)]);
};

export const deleteFieldHandler = (id: string, embedId: string, _fields: any, setField: (value: any) => void) =>
{
    const index = Number(id);
    const fields: any = {};

    for(let i = 1; i <= 10; i++)
        fields[`${i}`] = _fields[`${i}`] || [];

    const currentFields = fields[Number(embedId)+1];

    if(!fields[Number(embedId)+1])
        return;
    
    else if(fields[Number(embedId)+1].length === 1)
        fields[Number(embedId)+1] = [];
    
    else if(index === 0)
        fields[Number(embedId)+1] = [...currentFields.slice(1, currentFields.length+1)];
    
    else if(index === fields.length-1)
        fields[Number(embedId)+1] = [...currentFields.slice(0, index)];

    else
        fields[Number(embedId)+1] = [...currentFields.slice(0, index), ...currentFields.slice(index+1)];

    return setField(fields);
};