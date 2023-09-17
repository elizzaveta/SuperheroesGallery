import React from 'react';
import DarkPurpleButton from "./DarkPurpleButton";
import RedButton from "./RedButton";
import styles from '../assets/css/components/ActionsBar.module.css'

function ActionsBar(props:{deleteCallback: ()=>void, editCallback: ()=>void, className?:string}) {
    return (
        <div className={`${styles.wrapper} ${props.className}`}>
            <DarkPurpleButton title='Edit' onClick={props.editCallback}/>
            <RedButton title='Delete' onClick={props.deleteCallback}/>
        </div>
    );
}

export default ActionsBar;