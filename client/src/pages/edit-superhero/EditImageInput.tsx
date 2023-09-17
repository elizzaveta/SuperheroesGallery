import React, {useState} from 'react';
import styles from "../../assets/css/pages/create-superhero/ImageInput.module.css";
import {ImageType} from "../../types/Image.type";

function EditImageInput(props: {onChange:(imageId: number)=>void, images: ImageType[]}) {
    const [imagePreviews, setImagePreviews] = useState<ImageType[]>(props.images);

    const handleImageRemove = (imageId: number) => {
        setImagePreviews(prevPreviews => prevPreviews.filter((image) => image.id !== imageId));
        props.onChange(imageId)
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.imagePreviewContainer}>
                {imagePreviews.map((image) => (
                    <div key={image.id} className={styles.imagePreview}>
                        <img src={`data:image/jpeg;base64,${image.base64Image}`} alt={`Preview ${image.id}`} className={styles.imagePreview}/>
                        <button className={styles.button} onClick={() => handleImageRemove(image.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EditImageInput;