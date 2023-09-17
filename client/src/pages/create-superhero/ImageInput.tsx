import React, {useState, ChangeEvent} from 'react';
import styles from '../../assets/css/pages/create-superhero/ImageInput.module.css'

function ImageInput(props: {onAdd:(images: File[])=>void, onDelete:(image: File)=>void}) {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const filePreviews = files.map(file => URL.createObjectURL(file));

        setImagePreviews(prevPreviews => [...prevPreviews, ...filePreviews]);
        setImages(prevPreviews => [...prevPreviews, ...files]);
        if (e.target.files) {
            const imageArray = Array.from(e.target.files);
            props.onAdd(imageArray)
        }
    };

    const handleImageRemove = (lastModified: number) => {
        console.log('here')
        const file = images.find(image => image.lastModified === lastModified);
        if(file) props.onDelete(file);
        setImages(prevState => prevState.filter(image => image.lastModified !== lastModified))
    };

    return (
        <div className={styles.wrapper}>
            <input type="file" multiple accept="image/*" onChange={handleImageChange}/>
            <div className={styles.imagePreviewContainer}>
                {images.map((src, index) => (
                    <div key={index} className={styles.imagePreview}>
                        <img src={URL.createObjectURL(src)} alt={`Preview ${index}`} className={styles.imagePreview}/>
                        <div className={styles.button} onClick={()=>handleImageRemove(src.lastModified)}>Remove</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageInput;
