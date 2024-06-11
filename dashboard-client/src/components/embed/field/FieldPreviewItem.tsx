import { FC } from 'react';
import styles from './fieldPreview.module.scss';

type Props = {
    id: string;
}

export const FieldPreviewItem: FC<Props> = ({ id }) =>
{
    return (
        <div id={id} className={`${styles.field} ${id}`}>
            <div className={styles.field_name}>
                <div id={styles.field_name_content}>

                </div>
            </div>

            <div className={styles.field_value}>
                <div id={styles.field_value_content}>

                </div>
            </div>
        </div>
    );
};