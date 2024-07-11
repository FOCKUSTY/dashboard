import { FC, FormEvent } from 'react';
import { IoIosArrowForward } from "react-icons/io"
import { RxCrossCircled } from 'react-icons/rx';

import { ClickHandler } from 'handlers/local/click-handler.directive';
import { DeleteFieldHandler } from 'handlers/global/delete-handler.directive';
import { Counter, InputHandler } from 'handlers/embed/input-handler.directive';
import { FieldInputHandler } from 'handlers/field/input-handler.directive';
import { CheckboxInputHandler } from 'handlers/field/checkbox-input-handler.directive';

import styles from './index.module.scss';
import FPS from './fieldPreview.module.scss';

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
                <div className={styles.container_title} onClick={(e) => ClickHandler({
                    event: e,
                    containerId: styles.field_container,
                    arrowId: styles.arrow,
                    containers,
                    id: name
                })}>
                    <IoIosArrowForward id={styles.arrow}/>
                    <span>Field {Number(id)+1}</span>
                </div>
                <RxCrossCircled
                    size={30}
                    id={styles.cross}
                    onClick={() => DeleteFieldHandler(id, embedId, _fields, setField)}
                />
            </div>

            <div id={styles.field_container}>
                <div>
                    <p>Название: <span id={styles.title_count}>0/256</span></p>
                    <textarea
                        className={styles.textarea} maxLength={256}
                        name="field_name"
                        id={styles.textarea_field_name}
                        onInput={(e) => {
                            Counter(e, styles.title_count, styles.textarea_field_name, 256, name);
                            FieldInputHandler(e, FPS.field_name_content, embedName, name);
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
                            Counter(e, styles.value_count, styles.textarea_field_value, 1024, name);
                            FieldInputHandler(e, FPS.field_value_content, embedName, name);
                        }}
                    ></textarea>
                </div>

                <div id={styles.inline_container}>
                    <p id={styles.inline_text}>В линию</p>
                    <input type="checkbox" name="inline" id={styles.inline} onInput={(e) =>
                        CheckboxInputHandler(e, FPS, styles)
                    }/>
                </div>

            </div>
        </div>
    )
};