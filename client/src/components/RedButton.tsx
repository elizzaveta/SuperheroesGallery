import React from 'react';
import styles from '../assets/css/components/RedButton.module.css'

function RedButton(props:{ title: string, onClick:()=>void}) {

    return (
        <button onClick={props.onClick} className={styles.redButton}>{props.title}</button>
    );
}

export default RedButton;