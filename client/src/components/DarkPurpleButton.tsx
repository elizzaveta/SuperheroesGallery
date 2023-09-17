import React from 'react';
import styles from '../assets/css/components/DarkPurpleButton.module.css'

function DarkPurpleButton(props:{ title: string, onClick:()=>void}) {
    return (
        <button onClick={props.onClick} className={styles.lightGrayButton}>{props.title}</button>
    );
}

export default DarkPurpleButton;