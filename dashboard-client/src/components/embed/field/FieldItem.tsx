import { FC, FormEvent, useContext } from 'react';
import { IoIosArrowForward } from "react-icons/io"
import styles from './index.module.scss';
import FPS from './fieldPreview.module.scss';
import { RxCrossCircled } from 'react-icons/rx';
import { FieldsContext } from '@/src/utils/contexts/fieldContext';
import { InputHandler } from '@/src/utils/fieldApi';

type Props = {
    id: string;
    setField: any;
    embedId: string;
}

export const FieldItem: FC<Props> = ({ id, setField, embedId }) =>
{
    const containers = new Map();

    const { fields } = useContext(FieldsContext);

    const clickHandler = (e: FormEvent, containerId: string, arrowId: string) =>
    {
        const document = e.currentTarget.ownerDocument;
        const main = document.getElementById(id);

        if(!main)
            return;

        const container: any = main.querySelector(`#${containerId}`);
        const arrow: any = main.querySelector(`#${arrowId}`);

        if(containers.get(containerId))
        {
            containers.set(containerId, false);
            container.style.display = 'none'
            arrow.style.rotate = '0deg';
        }
        else
        {
            containers.set(containerId, true);
            container.style.display = 'flex';
            arrow.style.rotate = '90deg';
        };
    };

    const deleteHandler = () =>
    {
        const index = Number(id);

        if(!fields)
            return
        
        if(fields.length === 1)
            return setField([]);

        if(index === 0)
            return setField([...fields.slice(1, fields.length+1)]);
        
        if(index === fields.length-1)
            return setField([...fields.slice(0, index)]);

        return setField([...fields.slice(0, index), ...fields.slice(index+1)]);
    };

    const inputHandler = (e: FormEvent, countId: string, textId: string, max: number|string) =>
    {
        const document = e.currentTarget.ownerDocument;
        const main = document.getElementById(id);

        if(!main)
            return;

        const count: any = main.querySelector(`#${countId}`);
        const text: any = main.querySelector(`#${textId}`);

        count.textContent = `${text?.value.length}/${max}`;
    };

    return (
        <div className={styles.container} id={id}>
            <div id={styles.field_title}>
                <div className={styles.container_title} onClick={(e) => clickHandler(e, styles.field_container, styles.arrow)}>
                    <IoIosArrowForward id={styles.arrow}/>
                    <span>Field {Number(id)+1}</span>
                </div>
                <RxCrossCircled size={30} id={styles.cross} onClick={deleteHandler}/>
            </div>

            <div id={styles.field_container}>
                <div>
                    <p>Название: <span id={styles.title_count}>0/256</span></p>
                    <textarea
                        className={styles.textarea} maxLength={256}
                        name="field_name"
                        id={styles.textarea_field_name}
                        onInput={(e) => {
                            inputHandler(e, styles.title_count, styles.textarea_field_name, 256);
                            InputHandler(e, FPS.field_name_content, embedId, id);
                        }}
                    ></textarea>
                </div>

                <div>
                    <p>Значение: <span id={styles.value_count}>0/1024</span></p>
                    <textarea
                        className={`${styles.textarea} ${styles.textarea_main}`}
                        name="field_value" maxLength={1024}
                        id={styles.textarea_field_value}
                        onInput={(e) => {
                            inputHandler(e, styles.value_count, styles.textarea_field_value, 1024);
                            InputHandler(e, FPS.field_value_content, embedId, id);
                        }}
                    ></textarea>
                </div>

                <div id={styles.inline_container}>
                    <p id={styles.inline_text}>В линию</p>
                    <input type="checkbox" name="inline" id={styles.inline} />
                </div>

            </div>
        </div>
    )
};