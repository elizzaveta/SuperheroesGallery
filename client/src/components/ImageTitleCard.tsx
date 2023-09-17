import React from 'react';
import styles from '../assets/css/components/ImageTitleCard.module.css'

function ImageTitleCard(props: { image: string, title: string }) {
    return (
        <div className={styles.card}>
            <div
                style={{ backgroundImage: `url(${props.image})` }}
                className={styles.imageViewport}
            ></div>
            <p className={styles.title}>{props.title}</p>
        </div>
    );
}

export default ImageTitleCard;