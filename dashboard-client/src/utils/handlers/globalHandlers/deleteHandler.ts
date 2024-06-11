export const deleteHandler = (id: string, attacments: string[], setAttachment: (value: any) => void) =>
{
    const index = Number(id);

    if(!attacments)
        return
    
    if(attacments.length === 1)
        return setAttachment([]);
    
    if(index === 0)
        return setAttachment([...attacments.slice(1, attacments.length+1)]);
    
    if(index === attacments.length-1)
        return setAttachment([...attacments.slice(0, index)]);

    return setAttachment([...attacments.slice(0, index), ...attacments.slice(index+1)]);
};