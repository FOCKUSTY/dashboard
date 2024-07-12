import { FormEvent } from "react"

export const ClickOnBackgroundHandler = (event: FormEvent, setModalVisible: (boolean: boolean) => void, backgroundId: string): void =>
{
    const target: any = event.target;

    if(target.id !== backgroundId)
        return;

    setModalVisible(false);
};