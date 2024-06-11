type CreateHandlerType = {
    count: number,
    attacments: string[],
    maxAttacments: number,
    setAttachment: (value: any) => void,
    setCount: (value: number) => void
};

export const createHandler = (data: CreateHandlerType) => {
    data.setCount(data.count+1);

    if(data.attacments.length === data.maxAttacments)
        return;

    data.setAttachment([...data.attacments, `${data.count}`]);
};