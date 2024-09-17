import { FormEvent } from "react";

type ClickHandlerType = {
    event: FormEvent,
    containerId: string,
    arrowId: string,
    id: string,
    containers: Map<any, any>;
}

class Handler {
    public readonly click = (data: ClickHandlerType) => {
        const document = data.event.currentTarget.ownerDocument;
        const main = document.getElementsByClassName(data.id)[0];
    
        if(!main) return;
    
        const container: any = main.querySelector(`#${data.containerId}`);
        const arrow: any = main.querySelector(`#${data.arrowId}`);
    
        if(data.containers.get(data.containerId)) {
            data.containers.set(data.containerId, false);

            container.style.display = 'none';
            arrow.style.rotate = '0deg';
        } else {
            data.containers.set(data.containerId, true);

            container.style.display = 'block';
            arrow.style.rotate = '90deg';
        };
    };
};

export default Handler;