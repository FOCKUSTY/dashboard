import styles from './index.module.scss';
import FPS from './field-preview.module.scss';

import React from 'react';

import { IoIosArrowForward } from "react-icons/io"
import { RxCrossCircled } from 'react-icons/rx';

import ClickHandler from '../../../utils/handlers/local/click.handler';
import DeleteHandler from '../../../utils/handlers/global/delete.handler';
import EmbedInputHandler from '../../../utils/handlers/embed/input.handler.ts';
import FieldInputHandler from '../../../utils/handlers/field/input.handler';
import CheckboxHandler from '../../../utils/handlers/field/checkbox.handler';

const onClick = new ClickHandler().handler;
const input = new FieldInputHandler().handler;
const checkbox = new CheckboxHandler().handler;
const count = new EmbedInputHandler().count;

const deleteHandler = new DeleteHandler();

type Props = {
    id: string;
    setField: any;
    embedId: string;
    _fields: {[key: string]: string[]};
}

class Component extends React.Component<Props> {
    private readonly containers: Map<any, any>;
    private readonly name: string;;
    private readonly embed_name: string;

    constructor(props: Props) {
        super(props);

        this.containers = new Map();
        this.name = `field_${props.id}`;
        this.embed_name = `embed_${props.embedId}`
    };

    private readonly Field = () => {
        const {
            _fields,
            embedId,
            id,
            setField
        } = this.props;

        return (
            <div className={`${styles.container} ${this.name}`} id={this.props.id}>
                <div id={styles.field_title}>
                    <div className={styles.container_title} onClick={(e) =>
                        onClick({
                            event: e,
                            containerId: styles.field_container,
                            arrowId: styles.arrow,
                            containers: this.containers,
                            id: this.name
                        })}
                    >
                        <IoIosArrowForward id={styles.arrow}/>
                        <span>Field {Number(this.props.id)+1}</span>
                    </div>
                    <RxCrossCircled size={30} id={styles.cross} onClick={() =>
                        deleteHandler.deleteField({id, embedId, _fields, setField})}/>
                </div>
    
                <div id={styles.field_container}>
                    <div>
                        <p>Название: <span id={styles.title_count}>0/256</span></p>
                        <textarea
                            className={styles.textarea} maxLength={256}
                            name="field_name"
                            id={styles.textarea_field_name}
                            onInput={(e) => {
                                count(e, styles.title_count, styles.textarea_field_name, 256, this.name);
                                input(e, FPS.field_name_content, this.embed_name, this.name);
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
                                count(e, styles.value_count, styles.textarea_field_value, 1024, this.name);
                                input(e, FPS.field_value_content, this.embed_name, this.name);
                            }}
                        ></textarea>
                    </div>
    
                    <div id={styles.inline_container}>
                        <p id={styles.inline_text}>В линию</p>
                        <input type="checkbox" name="inline" id={styles.inline} onInput={(e) =>
                            checkbox(e, id, embedId, styles)
                        }/>
                    </div>
    
                </div>
            </div>
        )
    };

    public readonly render = (): React.ReactNode => {
        return this.Field();
    };
};

export default Component;