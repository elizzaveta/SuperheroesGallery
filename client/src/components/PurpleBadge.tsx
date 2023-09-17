import React from 'react';
import styles from '../assets/css/components/PurpleBadge.module.css'

function PurpleBadge(props: {text: string}) {
    return (
        <div className={styles.badge}>{props.text}</div>
    );
}

export default PurpleBadge;