type CreateHandlerType = {
    count: number,
    attacments: string[],
    maxAttacments: number,
    setAttachment: (value: any) => void,
    setCount: (value: number) => void,
    id?: string,
    fields?: any,
    event: any
};

export const CreateHandler = (data: CreateHandlerType) =>
{
    if(data.attacments.length === data.maxAttacments)
        return;

    data.setCount(data.count+1);

    const fields: any = {};

    for(let i = 1; i <= 10; i++)
        fields[`${i}`] = data.fields[`${i}`] || []

    if(!data.id)
        return data.setAttachment([...data.attacments, `${data.count}`]);

    fields[`${Number(data.id)+1}`] = [...data.attacments, `${data.count}`];
    data.setAttachment(fields);
};

export const DownloadCreateHandler = async (embeds: any[], setEmbed: (value: any[]) => void) =>
{
    if(embeds.length === 0)
        return;

    const downloadedEmbeds: any[] = [];

    for(const embed of embeds)
    {
        const id = `${embeds.indexOf(embed)}`;

        downloadedEmbeds.push(id);
    };

    setEmbed(downloadedEmbeds);
};