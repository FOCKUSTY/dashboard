import { FC, FormEvent, useContext, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import styles from './index.module.scss';
import EPS from './embedPreview.module.scss';
import { EmbedsContext } from '@/src/utils/contexts/embedsContext';
import { FieldsContext } from '@/src/utils/contexts/fieldContext';
import { FieldItem } from './field/FieldItem';
import { getHexSymbol, t } from '../../utils/helpers';
import { useRouter } from 'next/router';
import { InputAuthorUrlHandler, InputColorHandler, InputHandler, InputUrlHandler } from '@/src/utils/embedApi';

type Props = {
    id: string;
    setEmbed: any;
}

export const EmbedItem: FC<Props> = ({ id, setEmbed }) =>
{
    const router = useRouter();
    const l = router.locale || 'ru';
    const containers = new Map();

    const { embeds } = useContext(EmbedsContext);
    const { setFields } = useContext(FieldsContext);
    
    const [ fields, setField ] = useState<string[]>([]);
    const [ count, setCount ] = useState(1);

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
            container.style.display = 'none';
            arrow.style.rotate = '0deg';
        }
        else
        {
            containers.set(containerId, true);
            container.style.display = 'block';
            arrow.style.rotate = '90deg';
        };
    };

    const deleteHandler = () =>
    {
        const index = Number(id);

        if(!embeds)
            return
        
        if(embeds.length === 1)
            return setEmbed([]);

        if(index === 0)
            return setEmbed([...embeds.slice(1, embeds.length+1)]);
        
        if(index === embeds.length-1)
            return setEmbed([...embeds.slice(0, index)]);

        return setEmbed([...embeds.slice(0, index), ...embeds.slice(index+1)]);
    };

    const inputColorHandler = (e: FormEvent, valueId: string) =>
    {
        const document = e.currentTarget.ownerDocument;
        const target: any = e.currentTarget;
        const main = document.getElementById(id);

        if(!main)
            return;

        const value: any = main.querySelector(`#${valueId}`);
        const line: any = main.querySelector(`#${styles.container_left}`);
        
        value.value = target.value;
        line.style.background = target.value;
    };

    const textareaInputColorHandler = (e: any) =>
    {
        const document = e.currentTarget.ownerDocument;
        const main = document.getElementById(id);
        const value: string[] = e.currentTarget.value.split('');
        const color = main.querySelector(`#${styles.input_body_color}`);
        const line = main.querySelector(`#${styles.container_left}`);
        
        value[0] = '#';

        for(let char of value)
            if(!getHexSymbol(char))
                value[value.indexOf(char)] = '';
        
        const v = value.join('');

        e.currentTarget.value = v;
        
        if(v.length === 7)
        {
            line.style.background = v;
            color.value = v;
        }
    };

    const inputHandler = (e: FormEvent, countId: string, textId: string, max: number|string) =>
    {
        const document = e.currentTarget.ownerDocument;
        const main = document.getElementById(id);

        if(!main)
            return;

        const count: any = main.querySelector(`#${countId}`);
        const text: any = main.querySelector(`#${textId}`);

        count.textContent = `${text.value.length}/${max}`;
    };
 
    const createHandler = () =>
    {
        setCount(count+1);

        if(fields.length === 25)
            return;

        setField([...fields, `${count}`]);
    };

    return (
        <div className={styles.container} id={id}>
            <div id={styles.container_left}></div>
            <div id={styles.container_right}>
                <div id={styles.embed_title}>
                    <div className={styles.container_title} onClick={(e) => {clickHandler(e, styles.inner_container, styles.embed_arrow)}}>
                        <IoIosArrowForward id={styles.embed_arrow}/>
                        <span>Embed {Number(id)+1}</span>
                    </div>
                    <RxCrossCircled size={30} id={styles.cross} onClick={deleteHandler}/>
                </div>
                
                <div id={styles.inner_container}>
                    <div className={styles.author}>
                        <div className={styles.container_title} onClick={(e) => {clickHandler(e, styles.author_container, styles.author_arrow)}}>
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
                                        inputHandler(e, styles.author_nickname_count, styles.textarea_author_nickname, 256);
                                        InputHandler(e, EPS.author_nickname, id);
                                    }}
                                ></textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('URL автора', l)}:</p>
                                <textarea name="author_url" className={`${styles.url} ${styles.textarea}`} id={styles.textarea_author_url}
                                    onInput={(e) => {
                                        InputAuthorUrlHandler(e, EPS.author_nickname, id, EPS.author_link);
                                    }}
                                ></textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('URL аватара', l)}:</p>
                                <textarea name="author_icon_url" className={`${styles.url} ${styles.textarea}`} id={styles.textarea_author_icon_url}
                                    onInput={(e) => {
                                        InputUrlHandler(e, EPS.author_image, id);
                                    }}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className={styles.body}>
                        <div className={styles.container_title} onClick={(e) => {clickHandler(e, styles.body_container, styles.body_arrow)}}>
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
                                        inputHandler(e, styles.body_title_count, styles.textarea_body_title, 256);
                                        InputHandler(e, EPS.body_title, id);
                                    }}
                                ></textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('Описание', l)}: <span id={styles.body_body_count}>0/4096</span></p>
                                <textarea
                                    maxLength={4096}
                                    className={`${styles.textarea_main} ${styles.textarea}`}
                                    name="body_description"
                                    id={styles.textarea_body_description}
                                    onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                                        inputHandler(e, styles.body_body_count, styles.textarea_body_description, 4096);
                                        InputHandler(e, EPS.body_content, id);
                                    }}
                                ></textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('URL оглавнения', l)}:</p>
                                <textarea className={`${styles.url} ${styles.textarea}`} name="body_url" id={styles.textarea_body_url}
                                    onInput={(e) => {
                                        InputAuthorUrlHandler(e, EPS.body_title, id, EPS.body_title_link);
                                    }}
                                ></textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('Цвет', l)}:</p>
                                <div className={styles.color_container}>
                                    <textarea maxLength={7} name='color_value' className={`${styles.url} ${styles.textarea}`} id={styles.color_value} onInput={(e) => {
                                        textareaInputColorHandler(e);
                                        InputColorHandler(e, id);
                                    }} defaultValue={'#202225'}></textarea>
                                    <input type="color" name="body_color" id={styles.input_body_color} onInput={(e) => {
                                        inputColorHandler(e, styles.color_value);
                                        InputColorHandler(e, id);
                                    }} defaultValue={'#202225'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.fields}>
                        <div className={styles.container_title} onClick={(e) => {clickHandler(e, styles.fields_container, styles.fields_arrow)}}>
                            <IoIosArrowForward id={styles.fields_arrow}/>
                            <span>Fileds ({fields.length})</span>
                        </div>
                        <div id={styles.fields_container}>
                            <FieldsContext.Provider value={{fields: fields, setFields}}>
                                {fields.map(field =>
                                    <FieldItem
                                        id={`${fields.indexOf(field)}`}
                                        key={field}
                                        setField={setField}
                                        embedId={id}
                                    />
                                )}
                            </FieldsContext.Provider>
                            <button
                                id={styles.field_createbtn}
                                className={styles.btn}
                                onClick={createHandler}
                            >{t('Создать field', l)}</button>
                        </div>
                    </div>
                    
                    <div className={styles.images}>
                        <div className={styles.container_title} onClick={(e) => {clickHandler(e, styles.images_container, styles.images_arrow)}}>
                            <IoIosArrowForward id={styles.images_arrow}/>
                            <span>Images</span>
                        </div>
                        <div id={styles.images_container}>
                            <div className={styles.inner}>
                                <p>{t('URL изображения', l)}:</p>
                                <textarea className={`${styles.url} ${styles.textarea}`} name="image_url" id={styles.images_image_urls}
                                    onInput={(e) => {
                                        InputUrlHandler(e, EPS.image, id);
                                    }}
                                ></textarea>
                            </div>
                            <div className={styles.inner}>
                                <p>{t('URL миниатюры', l)}:</p>
                                <textarea className={`${styles.url} ${styles.textarea}`} name="thumbnail_url" id={styles.images_thumbnail_url}
                                    onInput={(e) => {
                                        InputUrlHandler(e, EPS.thumbnail_image, id);
                                    }}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.container_title} onClick={(e) => {clickHandler(e, styles.footer_container, styles.footer_arrow)}}>
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
                                        inputHandler(e, styles.footer_body_count, styles.footer_content, 2048);
                                        InputHandler(e, EPS.footer_content, id)
                                    }}
                                ></textarea>
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
                                    onInput={(e) => {
                                        InputUrlHandler(e, EPS.footer_icon, id);
                                    }}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};