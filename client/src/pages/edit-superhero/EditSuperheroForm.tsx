import React, {useState} from 'react';
import {SuperheroType} from "../../types/Superhero.type";
import {useNavigate} from "react-router-dom";
import {MultiValue} from "react-select";
import {uploadImages} from "../../api/images/upload-images";
import styles from "../../assets/css/pages/create-superhero/SuperheroForm.module.css";
import ImageInput from "../create-superhero/ImageInput";
import EditSuperpowerSelect from "./EditSuperpowerSelect";
import EditImageInput from "./EditImageInput";
import {deleteImagesById} from "../../api/images/delete-images-by-id";
import {updateSuperhero} from "../../api/superheroes/updateSuperhero";

function EditSuperheroForm(props:{superheroData: SuperheroType}) {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState<string>(props.superheroData.nickname);
    const [realName, setRealName] = useState<string>(props.superheroData.real_name);
    const [originDescription, setOriginDescription] = useState<string>(props.superheroData.origin_description);
    const [catchPhrase, setCatchPhrase] = useState<string>(props.superheroData.catch_phrase);
    const [superpowerIds, setSuperpowerIds] = useState<number[]>(props.superheroData.superpowers.map(superpower=>superpower.id));
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
    const [images, setImages] = useState<File[]>([])

    const handleSuperpowerSelect = (e: MultiValue<{ value: string, label: string }>) => {
        setSuperpowerIds(e.map((selectedOption) => parseInt(selectedOption.value)));
    };
    const handleImageDelete=(imageId: number)=>{
        setImagesToDelete(prevState => [...prevState, imageId]);
    }

    const handleImageInputAdd = (images: File[]) =>{
        setImages((prev) => [...prev, ...images]);
    }

    const handleImageInputDelete = (imageToRemove: File) =>{
        setImages(prevState => prevState.filter(image => image !== imageToRemove));
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const superheroData = {
            nickname: nickname,
            real_name: realName,
            origin_description: originDescription,
            catch_phrase: catchPhrase,
            superpowersIds: superpowerIds
        }
        await updateSuperhero(props.superheroData.id, superheroData)
            .then(async () => {
                if (imagesToDelete) await deleteImagesById(imagesToDelete);
            })
            .then(async () => {
                if (images.length) await uploadImages(images, props.superheroData.id);
            })
            .then(()=>navigate(`/details/${props.superheroData.id}`))
    }

    return (
        <div>
            <form className={styles.form} onSubmit={submitForm}>
                <label htmlFor='nickname'>Nickname</label>
                <input type='text' id='nickname' placeholder='Nickname'
                       defaultValue={props.superheroData.nickname}
                       onChange={(e) => setNickname(e.target.value)}
                       required/>
                <label htmlFor='real_name'>Real Name</label>
                <input type='text' id='real_name' placeholder='Real Name'
                       defaultValue={props.superheroData.real_name}
                       onChange={(e) => setRealName(e.target.value)}
                       required/>
                <label htmlFor='origin_description'>Origin Description</label>
                <input type='text' id='origin_description' placeholder='Origin Description'
                       defaultValue={props.superheroData.origin_description}
                       onChange={(e) => setOriginDescription(e.target.value)}
                       required/>
                <label htmlFor='catch_phrase'>Catch Phrase</label>
                <input type='text' id='catch_phrase' placeholder='Catch Phrase'
                       defaultValue={props.superheroData.catch_phrase}
                       onChange={(e) => setCatchPhrase(e.target.value)}
                       required/>
                <label>Superpowers</label>
                <EditSuperpowerSelect superpowers={props.superheroData.superpowers} onChange={(e) => handleSuperpowerSelect(e)}/>
                <label>Images</label>
                <EditImageInput onChange={handleImageDelete} images={props.superheroData.images}/>
                <label>Add Images</label>
                <ImageInput onAdd={handleImageInputAdd} onDelete={handleImageInputDelete}/>
                <input type='submit' value='Save'/>
            </form>
        </div>
    );
}

export default EditSuperheroForm;