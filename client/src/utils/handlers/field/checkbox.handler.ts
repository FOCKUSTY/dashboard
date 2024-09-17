import { FormEvent } from "react";

class Remover {
    private readonly removeItem = (index: number, array: any[]) => {
        return [...array.slice(0, index), ...array.slice(index+1)];
    };
    
    protected readonly remove = (arrays: [any[], boolean[]], element: any) => {
        const index = arrays[0].indexOf(element);
    
        return [
            this.removeItem(index, arrays[0]),
            this.removeItem(index, arrays[1])
        ];
    };
};

class Handler extends Remover {
    public readonly checkbox = (event: FormEvent<HTMLInputElement>, fieldId: string, embedId: string, styles: any) => {
        const document = event.currentTarget.ownerDocument;
        const id = Number(fieldId);
    
        const ChatPreview = document.getElementById('ChatPreview');
        const ChatInput = document.getElementById('ChatInput');
    
        const embed = ChatPreview?.getElementsByClassName(`embed_${embedId}`)[0];
        const embedInput = ChatInput?.getElementsByClassName(`embed_${embedId}`)[0];
    
        const fieldsInput: any[] = [];
    
        let fields: any[] = [];
        let values: boolean[] = [];
    
        const factor = id > 3
            ? 3
            : 2;

        for(let i = id-factor; i <= id+factor; i++) {
            if(i < 0) continue;
            if(!embedInput?.getElementsByClassName(`field_${i}`)[0]) continue;
    
            fields.push(embed?.getElementsByClassName(`field_${i}`)[0]);
            fieldsInput.push(embedInput?.getElementsByClassName(`field_${i}`)[0]);            
        };
    
        for(const field of fieldsInput) {
            values.push(field.querySelector(`#${styles.inline}`)?.checked);
        };
    
        for(const index in values) {
            if(values[index] || !fields[index]) continue;
    
            fields[index].style = 'grid-column: 1 / 13';
            [fields, values] = this.remove([fields, values], fields[index]);
        };
    
        const fieldsCount = fields.filter(el =>
            !!el && values[fields.indexOf(el)]).length;
        
        const gridColumn =
            fieldsCount === 3
                ? 4
                : 6;
    
        if(fieldsCount === 1)
            return fields[0].style = 'grid-column: 1 / 13';
    
        for(let index = 0; index < fieldsCount; index++) {
            if(values[index]) {
                const first = 1 + index * gridColumn;
                const second = 1 + (1 + index) * gridColumn;

                fields[index].style = `grid-column: ${first} / ${second}`;
            } else {
                fields[index].style = 'grid-column: 1 / 13';
            };
        };
    };
};

export default Handler;