import { FC, FormEvent, useContext, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { EmbedsContext } from '@/src/utils/contexts/embedsContext';
import { FieldsContext } from '@/src/utils/contexts/fieldContext';
import { FieldItem } from './field/FieldItem';
import { t } from '../../utils/helpers';
import { useRouter } from 'next/router';
import { deleteHandler } from '@/src/utils/handlers/globalHandlers/deleteHandler';
import { createHandler } from '@/src/utils/handlers/globalHandlers/createHandler';
import { clickHandler } from '@/src/utils/handlers/localHandlers/clickHandler';
import styles from './index.module.scss';
import EPS from './embedPreview.module.scss';
import { InputHandler, inputHandlerCount } from '@/src/utils/handlers/embedHandlers/inputHandler';
import { ColorInputHandler, colorInputHandler, textareaColorInputHandler } from '@/src/utils/handlers/embedHandlers/colorInputHandler';

type Props = {
    id: string;
    setEmbed: any;
    _fields: any;
    setField: any;
}

export const EmbedItem: FC<Props> = ({ id, setEmbed, _fields, setField }) =>
{
    const router = useRouter();
    const l = router.locale || 'ru';
    const containers = new Map();

    const { embeds } = useContext(EmbedsContext);
    const { setFields } = useContext(FieldsContext);
    
    const [ count, setCount ] = useState(1);
    
    const fields: string[] = _fields[`${Number(id)+1}`];
    const name = `embed_${id}`;

    return (
        <div className={`${styles.container} ${name}`} id={id}>
            <div id={styles.container_left}></div>
            <div id={styles.container_right}>
                <div id={styles.embed_title}>
                    <div className={styles.container_title} onClick={(e) =>
                        clickHandler({
                            event: e,
                            containerId: styles.inner_container,
                            arrowId: styles.embed_arrow, containers,
                            id: name
                        })}>
                        <IoIosArrowForward id={styles.embed_arrow}/>
                        <span>Embed {Number(id)+1}</span>
                    </div>
                    <RxCrossCircled size={30} id={styles.cross} onClick={() => deleteHandler(id, embeds!, setEmbed, _fields, setField)}/>
                </div>
                
                <div id={styles.inner_container}>
                    <div className={styles.author}>
                        <div className={styles.container_title} onClick={(e) =>
                            clickHandler({
                                event: e,
                                containerId: styles.author_container,
                                arrowId: styles.author_arrow, containers,
                                id: name
                            })}>
                            <IoIosArrowForward id={styles.author_arrow}/>
                            <span>Author</span>
                        </div>
                        <div id={styles.author_container}>
                            <div className={styles.inner}>
                                <p>{t('Название', l)}: <span id={styles.author_nickname_count}>0/256</span></p>
                                <textarea
                                    name="author_nickname" maxLength={256} required
                                    className={styles.textarea}
                                    id={styles.textarea_author_nickname}
                                    onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                                        inputHandlerCount(e, styles.author_nickname_count, styles.textarea_author_nickname, 256, name);
                                        InputHandler({
                                            event: e,
                                            previewId: EPS.author_nickname,
                                            type: 'content',
                                            id: name
                                        });
                                    }}>
                                </textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('URL автора', l)}:</p>
                                <textarea name="author_url" className={`${styles.url} ${styles.textarea}`} id={styles.textarea_author_url}
                                    onInput={(e) => InputHandler({
                                        event: e,
                                        previewId: EPS.author_nickname,
                                        type: 'author_url',
                                        linkId: EPS.author_link,
                                        id: name
                                    })}>
                                </textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('URL аватара', l)}:</p>
                                <textarea name="author_icon_url" className={`${styles.url} ${styles.textarea}`} id={styles.textarea_author_icon_url}
                                    onInput={(e) => InputHandler({
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
                            clickHandler({
                                event: e,
                                containerId: styles.body_container,
                                arrowId: styles.body_arrow, containers,
                                id: name
                            })}>
                            <IoIosArrowForward id={styles.body_arrow}/>
                            <span>Body</span>
                        </div>
                        <div id={styles.body_container}>                    
                            <div className={styles.inner}>
                                <p>{t('Оглавнение', l)}: <span id={styles.body_title_count}>0/256</span></p>
                                <textarea
                                    maxLength={256} required
                                    className={styles.textarea}
                                    name="body_title"
                                    id={styles.textarea_body_title}
                                    onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                                        inputHandlerCount(e, styles.body_title_count, styles.textarea_body_title, 256, name);
                                        InputHandler({
                                            event: e,
                                            previewId: EPS.body_title,
                                            type: 'content',
                                            id: name
                                        })
                                    }}>
                                </textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('Описание', l)}: <span id={styles.body_body_count}>0/4096</span></p>
                                <textarea
                                    maxLength={4096}
                                    className={`${styles.textarea_main} ${styles.textarea}`}
                                    name="body_description"
                                    id={styles.textarea_body_description}
                                    onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                                        inputHandlerCount(e, styles.body_body_count, styles.textarea_body_description, 4096, name);
                                        InputHandler({
                                            event: e,
                                            previewId: EPS.body_content, 
                                            type: "content",
                                            id: name
                                        });
                                    }}>
                                </textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('URL оглавнения', l)}:</p>
                                <textarea className={`${styles.url} ${styles.textarea}`} name="body_url" id={styles.textarea_body_url}
                                    onInput={(e) => InputHandler({
                                        event: e,
                                        previewId: EPS.body_title,
                                        type: 'author_url',
                                        linkId: EPS.body_title_link,
                                        id: name
                                    })}>
                                </textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('Цвет', l)}:</p>
                                <div className={styles.color_container}>
                                    <textarea maxLength={7} name='color_value' className={`${styles.url} ${styles.textarea}`} id={styles.color_value}
                                        onInput={(e) => {
                                            textareaColorInputHandler(e, name, styles);
                                            ColorInputHandler(e, name);
                                        }} defaultValue={'#202225'}></textarea>
                                    <input type="color" name="body_color" id={styles.input_body_color} onInput={(e) => {
                                        colorInputHandler(e, styles.color_value, name, styles);
                                        ColorInputHandler(e, name);
                                    }} defaultValue={'#202225'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.fields}>
                        <div className={styles.container_title} onClick={(e) => clickHandler({
                                event: e,
                                containerId: styles.fields_container,
                                arrowId: styles.fields_arrow, containers,
                                id: name
                            })}>
                            <IoIosArrowForward id={styles.fields_arrow}/>
                            <span>Fileds ({fields?.length})</span>
                        </div>
                        <div id={styles.fields_container}>
                            <FieldsContext.Provider value={{fields: fields, setFields}}>
                                {fields?.map(field =>
                                    <FieldItem
                                        id={`${fields.indexOf(field)}`}
                                        key={field}
                                        setField={setField}
                                        embedId={id}
                                        _fields={_fields}
                                    />
                                )}
                            </FieldsContext.Provider>
                            <button
                                id={styles.field_createbtn}
                                className={styles.btn}
                                onClick={() => createHandler({
                                    attacments: fields,
                                    maxAttacments: 25,
                                    setAttachment: setField, count, setCount, id,
                                    fields: _fields
                                })}>
                                {t('Создать field', l)}
                            </button>
                        </div>
                    </div>
                    
                    <div className={styles.images}>
                        <div className={styles.container_title} onClick={(e) =>
                            clickHandler({
                                event: e,
                                containerId: styles.images_container,
                                arrowId: styles.images_arrow, containers,
                                id: name
                            })}>
                            <IoIosArrowForward id={styles.images_arrow}/>
                            <span>Images</span>
                        </div>
                        <div id={styles.images_container}>
                            <div className={styles.inner}>
                                <p>{t('URL изображения', l)}:</p>
                                <textarea className={`${styles.url} ${styles.textarea}`} name="image_url" id={styles.images_image_urls}
                                    onInput={(e) =>  InputHandler({
                                        event: e,
                                        previewId: EPS.image,
                                        type: 'url',
                                        id: name
                                    })}>
                                </textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('URL миниатюры', l)}:</p>
                                <textarea className={`${styles.url} ${styles.textarea}`} name="thumbnail_url" id={styles.images_thumbnail_url}
                                    onInput={(e) => InputHandler({
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
                            clickHandler({
                                event: e,
                                containerId: styles.footer_container,
                                arrowId: styles.footer_arrow, containers,
                                id: name
                            })}>
                            <IoIosArrowForward id={styles.footer_arrow}/>
                            <span>Footer</span>
                        </div>
                        <div id={styles.footer_container}>
                            <div className={styles.inner}>
                                <p>{t('Описание', l)}: <span id={styles.footer_body_count}>0/2048</span></p>
                                <textarea
                                    maxLength={2048}
                                    className={`${styles.textarea_main} ${styles.textarea}`}
                                    name="footer"
                                    id={styles.footer_content}
                                    onInput={(e) => {
                                        inputHandlerCount(e, styles.footer_body_count, styles.footer_content, 2048, name);
                                        InputHandler({
                                            event: e,
                                            previewId: EPS.footer_content, 
                                            type: "content",
                                            id: name
                                        });
                                    }}>
                                </textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('Время', l)}:</p>
                                <input
                                    type="datetime-local"
                                    name="timestamp"
                                    id={styles.footer_time}
                                />
                            </div>
                            <div className={styles.inner}>
                                <p>{t('URL изображения', l)}:</p>
                                <textarea className={`${styles.url} ${styles.textarea}`} name="footer_icon_url" id={styles.textarea_footer_icon_url}
                                    onInput={(e) =>  InputHandler({
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