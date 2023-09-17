import React from 'react';
import styles from '../assets/css/components/InfoMessageBlock.module.css'

function InfoMessageBlock(props:{text: string}) {
    return (
        <div className={styles.wrapper}>
            <p>{props.text}</p>
        </div>
    );
}

export default InfoMessageBlock;