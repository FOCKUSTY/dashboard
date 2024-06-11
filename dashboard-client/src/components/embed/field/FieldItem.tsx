import { FC, useContext } from 'react';
import { IoIosArrowForward } from "react-icons/io"
import styles from './index.module.scss';
import FPS from './fieldPreview.module.scss';
import { RxCrossCircled } from 'react-icons/rx';
import { clickHandler } from '@/src/utils/handlers/localHandlers/clickHandler';
import { deleteFieldHandler } from '@/src/utils/handlers/globalHandlers/deleteHandler';
import { inputHandlerCount } from '@/src/utils/handlers/embedHandlers/inputHandler';
import { InputHandler } from '@/src/utils/handlers/fieldHandlers/inputHandler';

type Props = {
    id: string;
    setField: any;
    embedId: string;
    _fields: any;
}

export const FieldItem: FC<Props> = ({ id, setField, embedId, _fields }) =>
{
    const containers = new Map();
    const name = `field_${id}`;
    const embedName = `embed_${embedId}`

    return (
        <div className={`${styles.container} ${name}`} id={id}>
            <div id={styles.field_title}>
                <div className={styles.container_title} onClick={(e) => clickHandler({
                    event: e,
                    containerId: styles.field_container,
                    arrowId: styles.arrow,
                    containers,
                    id: name
                })}>
                    <IoIosArrowForward id={styles.arrow}/>
                    <span>Field {Number(id)+1}</span>
                </div>
                <RxCrossCircled size={30} id={styles.cross} onClick={() => deleteFieldHandler(id, embedId, _fields, setField)}/>
            </div>

            <div id={styles.field_container}>
                <div>
                    <p>Название: <span id={styles.title_count}>0/256</span></p>
                    <textarea
                        className={styles.textarea} maxLength={256}
                        name="field_name"
                        id={styles.textarea_field_name}
                        onInput={(e) => {
                            inputHandlerCount(e, styles.title_count, styles.textarea_field_name, 256, name);
                            InputHandler(e, FPS.field_name_content, embedName, name);
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
                            inputHandlerCount(e, styles.value_count, styles.textarea_field_value, 1024, name);
                            InputHandler(e, FPS.field_value_content, embedName, name);
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