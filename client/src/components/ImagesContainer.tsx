import React from 'react';
import {ImageType} from "../types/Image.type";
import styles from "../assets/css/components/ImagesContainer.module.css";

function ImagesContainer(props: {images: ImageType[]}) {
    return (
        <div className={styles.wrapper}>
            {
                props.images.map(image => {
                    return <div key={image.id}
                                style={{backgroundImage: `url(data:image/jpeg;base64,${image.base64Image})`}}
                                className={styles.imageCard}
                    ></div>
                })
            }
        </div>
    );
}

export default ImagesContainer;