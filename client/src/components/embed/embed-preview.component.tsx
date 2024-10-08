import styles from './embed-preview.module.scss';

import React from 'react';

import Field from './field/field-preview.component';

type Props = {
    id: string;
    _fields: { [key: string]: string[] };
};

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    private readonly EmbedPreview = () => {
        const id = this.props.id;

        const field = Number(id)+1
        const fields: string[] = this.props._fields[field];

        return (
            <div className={`${styles.embed} embed_${id}`} id={id}>
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
                            <Field
                                id={`${fields.indexOf(field)}`}
                                key={field}
                            />
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
        );
    };

    public readonly render = (): React.ReactNode => {
        return this.EmbedPreview();
    };
};

export default Component;