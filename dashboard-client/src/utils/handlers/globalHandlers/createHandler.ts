type CreateHandlerType = {
    count: number,
    attacments: string[],
    maxAttacments: number,
    setAttachment: (value: any) => void,
    setCount: (value: number) => void,
    id?: string,
    fields?: any;
};

export const createHandler = (data: CreateHandlerType) => {
    if(data.attacments.length === data.maxAttacments)
        return;

    data.setCount(data.count+1);

    const fields: any = {};

    for(let i = 1; i <= 10; i++)
        fields[`${i}`] = data.fields[`${i}`] || []

    if(data.id)
    {
        fields[`${Number(data.id)+1}`] = [...data.attacments, `${data.count}`];

        data.setAttachment(fields);
    }
    else
    {
        data.setAttachment([...data.attacments, `${data.count}`]);
    }
};