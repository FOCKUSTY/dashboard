import styles from './index.module.scss';
import EPS from './embed-preview.module.scss';

import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

import { IoIosArrowForward } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

import EmbedsContext from 'contexts/embed.context';
import FieldsContext from 'contexts/field.context';

import { FieldItem } from './field/FieldItem';

import DeleteHandler from 'utils/handlers/global/delete.handler';
import CreateHandler from 'utils/handlers/global/create.handler';
import ClickHandler from 'utils/handlers/local/click.handler';

import InputHandler from 'utils/handlers/embed/input.handler.ts';
import ColorInputHandler from 'utils/handlers/embed/color-input.handler';

import Locale from 'service/locale.service';

type Props = {
    id: string;
    _fields: { [key: string]: string[] };

    setEmbed: (value: any) => any;
    setField: (value: any) => any;
}

class Component extends React.Component<Props> {
    private readonly containers = new Map();

    private readonly fieldsContext = new FieldsContext();
    private readonly FieldContext = this.fieldsContext.context;

    private readonly embeds = new EmbedsContext().getContext().embeds;
    private readonly setFields = this.fieldsContext.getContext().setFields;
    
    constructor(props: Props) {
        super(props);
    };

    private readonly Embed = () => {
        const {
            id,
            _fields,
            setEmbed,
            setField
        } = this.props;

        const router = useRouter();
        const t = new Locale(router.locale || 'ru').translate;

        const [ count, setCount ] = useState(1);

        const field = Number(id)+1

        const fields: string[] = _fields[field];
        const name = `embed_${id}`;

        return (
            <div className={`${styles.container} ${name}`} id={id}>
                <div id={styles.container_left}></div>
                <div id={styles.container_right}>
                    <div id={styles.embed_title}>
                        <div className={styles.container_title} onClick={(e) =>
                            new ClickHandler().handler({
                                event: e,
                                containerId: styles.inner_container,
                                arrowId: styles.embed_arrow, containers: this.containers,
                                id: name
                            })}>
                            <IoIosArrowForward id={styles.embed_arrow}/>
                            <span>Embed {Number(id)+1}</span>
                        </div>
                        <RxCrossCircled size={30} id={styles.cross} onClick={() => new DeleteHandler().handler({
                            id: id,
                            attacments: this.embeds!,
                            setAttachment: setEmbed,
                            _fields: _fields,
                            setField: setField
                            })}
                        />
                    </div>
                    
                    <div id={styles.inner_container}>
                        <div className={styles.author}>
                            <div className={styles.container_title} onClick={(e) =>
                                new ClickHandler().handler({
                                    event: e,
                                    containerId: styles.author_container,
                                    arrowId: styles.author_arrow, containers: this.containers,
                                    id: name
                                })}>
                                <IoIosArrowForward id={styles.author_arrow}/>
                                <span>Author</span>
                            </div>
                            <div id={styles.author_container}>
                                <div className={styles.inner}>
                                    <p>{t('Название')}: <span id={styles.author_nickname_count}>0/256</span></p>
                                    <textarea
                                        name="author_nickname" maxLength={256} required
                                        className={styles.textarea}
                                        id={styles.textarea_author_nickname}
                                        onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                                            new InputHandler().count(e, styles.author_nickname_count, styles.textarea_author_nickname, 256, name);
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.author_nickname,
                                                type: 'content',
                                                id: name
                                            });
                                        }}>
                                    </textarea>
                                </div>
                                <div className={styles.inner}>
                                    <p>{t('URL автора')}:</p>
                                    <textarea name="author_url" className={`${styles.url} ${styles.textarea}`} id={styles.textarea_author_url}
                                        onInput={(e) =>
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.author_nickname,
                                                type: 'author_url',
                                                linkId: EPS.author_link,
                                                id: name
                                        })}>
                                    </textarea>
                                </div>
                                <div className={styles.inner}>
                                    <p>{t('URL аватара')}:</p>
                                    <textarea name="author_icon_url" className={`${styles.url} ${styles.textarea}`} id={styles.textarea_author_icon_url}
                                        onInput={(e) =>
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.author_image,
                                                type: 'url',
                                                id: name
                                        })}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
    
                        <div className={styles.body}>
                            <div className={styles.container_title} onClick={(e) =>
                                new ClickHandler().handler({
                                    event: e,
                                    containerId: styles.body_container,
                                    arrowId: styles.body_arrow, containers: this.containers,
                                    id: name
                                })}>
                                <IoIosArrowForward id={styles.body_arrow}/>
                                <span>Body</span>
                            </div>
                            <div id={styles.body_container}>                    
                                <div className={styles.inner}>
                                    <p>{t('Оглавнение')}: <span id={styles.body_title_count}>0/256</span></p>
                                    <textarea
                                        maxLength={256} required
                                        className={styles.textarea}
                                        name="body_title"
                                        id={styles.textarea_body_title}
                                        onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                                            new InputHandler().count(e, styles.body_title_count, styles.textarea_body_title, 256, name);
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.body_title,
                                                type: 'content',
                                                id: name
                                            })
                                        }}>
                                    </textarea>
                                </div>
                                <div className={styles.inner}>
                                    <p>{t('Описание')}: <span id={styles.body_body_count}>0/4096</span></p>
                                    <textarea
                                        maxLength={4096}
                                        className={`${styles.textarea_main} ${styles.textarea}`}
                                        name="body_description"
                                        id={styles.textarea_body_description}
                                        onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                                            new InputHandler().count(e, styles.body_body_count, styles.textarea_body_description, 4096, name);
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.body_content, 
                                                type: "content",
                                                id: name
                                            });
                                        }}>
                                    </textarea>
                                </div>
                                <div className={styles.inner}>
                                    <p>{t('URL оглавнения')}:</p>
                                    <textarea className={`${styles.url} ${styles.textarea}`} name="body_url" id={styles.textarea_body_url}
                                        onInput={(e) =>
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.body_title,
                                                type: 'author_url',
                                                linkId: EPS.body_title_link,
                                                id: name
                                        })}>
                                    </textarea>
                                </div>
                                <div className={styles.inner}>
                                    <p>{t('Цвет')}:</p>
                                    <div className={styles.color_container}>
                                        <textarea maxLength={7} name='color_value' className={`${styles.url} ${styles.textarea}`} id={styles.color_value}
                                            onInput={(e) => {
                                                new ColorInputHandler().colorTextInput(e, name, styles);
                                                new ColorInputHandler().colorInput(e, name);
                                            }} defaultValue={'#202225'}></textarea>
                                        <input type="color" name="body_color" id={styles.input_body_color} onInput={(e) => {
                                            new ColorInputHandler().inputColor(e, styles.color_value, name, styles);
                                            new ColorInputHandler().colorInput(e, name);
                                        }} defaultValue={'#202225'}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.fields}>
                            <div className={styles.container_title} onClick={(e) => new ClickHandler().handler({
                                    event: e,
                                    containerId: styles.fields_container,
                                    arrowId: styles.fields_arrow, containers: this.containers,
                                    id: name
                                })}>
                                <IoIosArrowForward id={styles.fields_arrow}/>
                                <span>Fileds ({fields?.length})</span>
                            </div>
                            <div id={styles.fields_container}>
                                <this.FieldContext.Provider value={{fields: fields, setFields: this.setFields}}>
                                    {fields.map(field =>
                                        <FieldItem
                                            id={`${fields.indexOf(field)}`}
                                            key={field}
                                            setField={setField}
                                            embedId={id}
                                            _fields={_fields}
                                        />
                                    )}
                                </this.FieldContext.Provider>
                                <button
                                    id={styles.field_createbtn}
                                    className={styles.btn}
                                    onClick={() => new CreateHandler().handler({
                                        attacments: fields,
                                        maxAttacments: 25,
                                        setAttachment: setField, count, setCount, id,
                                        fields: _fields
                                    })}>
                                    {t('Создать field')}
                                </button>
                            </div>
                        </div>
                        
                        <div className={styles.images}>
                            <div className={styles.container_title} onClick={(e) =>
                                new ClickHandler().handler({
                                    event: e,
                                    containerId: styles.images_container,
                                    arrowId: styles.images_arrow, containers: this.containers,
                                    id: name
                                })}>
                                <IoIosArrowForward id={styles.images_arrow}/>
                                <span>Images</span>
                            </div>
                            <div id={styles.images_container}>
                                <div className={styles.inner}>
                                    <p>{t('URL изображения')}:</p>
                                    <textarea className={`${styles.url} ${styles.textarea}`} name="image_url" id={styles.images_image_urls}
                                        onInput={(e) =>
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.image,
                                                type: 'url',
                                                id: name
                                        })}>
                                    </textarea>
                                </div>
                                <div className={styles.inner}>
                                    <p>{t('URL миниатюры')}:</p>
                                    <textarea className={`${styles.url} ${styles.textarea}`} name="thumbnail_url" id={styles.images_thumbnail_url}
                                        onInput={(e) =>
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.thumbnail_image,
                                                type: 'url',
                                                id: name
                                        })}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
    
                        <div className={styles.footer}>
                            <div className={styles.container_title} onClick={(e) =>
                                new ClickHandler().handler({
                                    event: e,
                                    containerId: styles.footer_container,
                                    arrowId: styles.footer_arrow, containers: this.containers,
                                    id: name
                                })}>
                                <IoIosArrowForward id={styles.footer_arrow}/>
                                <span>Footer</span>
                            </div>
                            <div id={styles.footer_container}>
                                <div className={styles.inner}>
                                    <p>{t('Описание')}: <span id={styles.footer_body_count}>0/2048</span></p>
                                    <textarea
                                        maxLength={2048}
                                        className={`${styles.textarea_main} ${styles.textarea}`}
                                        name="footer"
                                        id={styles.footer_content}
                                        onInput={(e) => {
                                            new InputHandler().count(e, styles.footer_body_count, styles.footer_content, 2048, name);
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.footer_content, 
                                                type: "content",
                                                id: name
                                            });
                                        }}>
                                    </textarea>
                                </div>
                                <div className={styles.inner}>
                                    <p>{t('Время')}:</p>
                                    <input
                                        type="datetime-local"
                                        name="timestamp"
                                        id={styles.footer_time}
                                    />
                                </div>
                                <div className={styles.inner}>
                                    <p>{t('URL изображения')}:</p>
                                    <textarea className={`${styles.url} ${styles.textarea}`} name="footer_icon_url" id={styles.textarea_footer_icon_url}
                                        onInput={(e) =>
                                            new InputHandler().handler({
                                                event: e,
                                                previewId: EPS.footer_icon, 
                                                type: "url",
                                                id: name
                                        })}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    public readonly render = (): React.ReactNode => {
        return this.Embed();
    };
};

export default Component;