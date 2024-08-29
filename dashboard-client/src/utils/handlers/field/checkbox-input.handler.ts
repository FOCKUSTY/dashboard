import { FormEvent } from "react";

import ES from 'components/embed/index.module.scss';
import EPS from 'components/embed/embedPreview.module.scss';

export const CheckboxChecker = (document: Document, FPS: any, styles: any) =>
{
    const checkboxValues: any[] = [];
    const checkboxNegativeValues: any[] = [];

    const embedElements: any = document.getElementsByClassName(ES.container);
    const embedPreviewElements: any = document.getElementsByClassName(EPS.embed);

    for(const embedElement of embedElements)
    {
        const embedPreviewElement = embedPreviewElements.item(embedElement.id)
        
        const inputFields: any = embedElement.getElementsByClassName(styles.container);
        const previewFields: any = embedPreviewElement.getElementsByClassName(FPS.field);

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
    
                gridCicle: for(let index = 0; index < v.length; index++)
                {
                    const field: any = previewFields.item(Number(v[index]));
    
                    if(!field)
                        continue gridCicle;

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

}

export const CheckboxInputHandler = (event: FormEvent<HTMLInputElement>, FPS: any, styles: any) =>
{
    const document = event.currentTarget.ownerDocument;

    CheckboxChecker(document, FPS, styles);
};