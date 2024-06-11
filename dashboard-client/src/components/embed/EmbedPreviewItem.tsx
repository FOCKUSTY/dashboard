import { FC, useContext, } from 'react';
import styles from './embedPreview.module.scss';
import { FieldPreviewItem } from './field/FieldPreviewItem'
import { FieldsContext } from '@/src/utils/contexts/fieldContext';

type Props = {
    id: string;
}

export const EmbedPreviewItem: FC<Props> = ({ id }) =>
{
    const { fields, setFields } = useContext(FieldsContext);

    return (
        <div className={`${styles.embed} ${id}`} id={id}>
            <div id={styles.conatiner}>
                <div id={styles.author}>
                    <img src="" id={styles.author_image} />
                    <span id={styles.author_nickname}></span>
                </div>

                <div id={styles.body}>
                    <span id={styles.body_title}></span>
                    <div id={styles.body_content}></div>
                </div>

                <div id={styles.fields}>
                    {fields?.map(field =>
                        <FieldPreviewItem id={`${fields.indexOf(field)}`} key={field}/>
                    )}
                </div>

                <img src="" id={styles.image} />

                <div id={styles.thumbnail}>
                    <img src="" id={styles.thumbnail_image} />
                </div>

                <div id={styles.footer}>
                    <img src={undefined} id={styles.footer_icon} />
                    <span id={styles.footer_content}>
                        <span id={styles.footer_timestamp}></span>
                    </span>
                </div>
            </div>
        </div>
    )
}