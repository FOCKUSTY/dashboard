import { FC, useContext } from 'react';
import { IoIosArrowForward } from "react-icons/io"
import styles from './index.module.scss';
import FPS from './fieldPreview.module.scss';
import { RxCrossCircled } from 'react-icons/rx';
import { FieldsContext } from '@/src/utils/contexts/fieldContext';
import { InputHandler } from '@/src/utils/api/fieldApi';
import { clickHandler } from '@/src/utils/handlers/localHandlers/clickHandler';
import { deleteHandler } from '@/src/utils/handlers/globalHandlers/deleteHandler';
import { inputHandlerCount } from '@/src/utils/handlers/embedHandlers/inputHandler';

type Props = {
    id: string;
    setField: any;
    embedId: string;
}

export const FieldItem: FC<Props> = ({ id, setField, embedId }) =>
{
    const containers = new Map();

    const { fields } = useContext(FieldsContext);

    return (
        <div className={styles.container} id={id}>
            <div id={styles.field_title}>
                <div className={styles.container_title} onClick={(e) => clickHandler({
                    event: e,
                    containerId: styles.field_container,
                    arrowId: styles.arrow,
                    containers, id
                })}>
                    <IoIosArrowForward id={styles.arrow}/>
                    <span>Field {Number(id)+1}</span>
                </div>
                <RxCrossCircled size={30} id={styles.cross} onClick={() => deleteHandler(id, fields!, setField)}/>
            </div>

            <div id={styles.field_container}>
                <div>
                    <p>Название: <span id={styles.title_count}>0/256</span></p>
                    <textarea
                        className={styles.textarea} maxLength={256}
                        name="field_name"
                        id={styles.textarea_field_name}
                        onInput={(e) => {
                            inputHandlerCount(e, styles.title_count, styles.textarea_field_name, 256, id);
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
                            inputHandlerCount(e, styles.value_count, styles.textarea_field_value, 1024, id);
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