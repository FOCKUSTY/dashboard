import { FormEvent } from "react";

export const CheckboxInputHandler = (event: FormEvent<HTMLInputElement>, FPS: any, styles: any) =>
{
    const document = event.currentTarget.ownerDocument;
    const checkboxValues = [];
    const checkboxNegativeValues = [];
    const inputFields: any = document.getElementsByClassName(styles.container);
    const previewFields: any = document.getElementsByClassName(FPS.field);

    if(!inputFields || !previewFields)
        return;
    
    for(const inputField of inputFields)
    {
        checkboxValues.push(inputField.querySelector(`#${styles.inline}`)?.checked
            ? inputField.id
            : false
        );
        
        checkboxNegativeValues.push(inputField.querySelector(`#${styles.inline}`)?.checked
            ? false
            : inputField.id
        );
    };

    const values = checkboxValues.join('').split('false').filter((value) => value !== '');
    const negaiveValues = checkboxNegativeValues.join('').split('false').filter((value) => value !== '');
    
    for(const value of values)
    {
        const length = value.length > 3
            ? Math.ceil(value.length / 3)
            : 1;

        for(let i = 0; i < length; i++)
        {
            const v = value.slice(i*3, (i+1)*3);
            const gridColumn = v.length === 3 ? 4 : 6;

            for(let index = 0; index < v.length; index++)
            {
                const field: any = previewFields[Number(v[index])];

                if(v.length === 1)
                    field.style = 'grid-column: 1 / 13';
                else
                    field.style = `grid-column: ${ 1 + index * gridColumn } / ${ 1 + (1 + index) * gridColumn }`;
            };
        };
    };

    for(const value of negaiveValues)
        if(previewFields[Number(value)])
            previewFields[Number(value)].style = 'grid-column: 1 / 13';
};