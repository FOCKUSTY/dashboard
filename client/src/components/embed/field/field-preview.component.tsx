import styles from './fieldPreview.module.scss';
import React from 'react';

type Props = {
    id: string;
};

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    private readonly Field = () => {
        return (
            <div id={this.props.id} className={`${styles.field} field_${this.props.id}`}>
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
    
    public readonly render = (): React.ReactNode => {
        return this.Field();
    };
};

export default Component;