import React, {useState} from 'react';
import styles from '../../assets/css/pages/create-superhero/SuperheroForm.module.css'
import SuperpowerSelect from "./SuperpowerSelect";
import ImageInput from "./ImageInput";
import {MultiValue} from "react-select";
import {uploadImages} from "../../api/images/upload-images";
import {createSuperhero} from "../../api/superheroes/createSuperhero";
import {useNavigate} from "react-router-dom";

function SuperheroForm() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState<string>();
    const [realName, setRealName] = useState<string>();
    const [originDescription, setOriginDescription] = useState<string>();
    const [catchPhrase, setCatchPhrase] = useState<string>();
    const [superpowerIds, setSuperpowerIds] = useState<number[]>([]);
    const [images, setImages] = useState<File[]>([]);

    const handleSuperpowerSelect = (e: MultiValue<{ value: string, label: string }>) => {
        setSuperpowerIds(e.map((selectedOption) => parseInt(selectedOption.value)));
    };
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
        await createSuperhero(superheroData)
            .then(async data => {
                await uploadImages(images, data.id)
                    .then(()=>navigate(`/details/${data.id}`))

            });
    }

    return (
        <div>
            <form className={styles.form} onSubmit={submitForm}>
                <label htmlFor='nickname'>Nickname</label>
                <input type='text' id='nickname' placeholder='Nickname'
                       onChange={(e) => setNickname(e.target.value)}
                       required/>
                <label htmlFor='real_name'>Real Name</label>
                <input type='text' id='real_name' placeholder='Real Name'
                       onChange={(e) => setRealName(e.target.value)}
                       required/>
                <label htmlFor='origin_description'>Origin Description</label>
                <input type='text' id='origin_description' placeholder='Origin Description'
                       onChange={(e) => setOriginDescription(e.target.value)}
                       required/>
                <label htmlFor='catch_phrase'>Catch Phrase</label>
                <input type='text' id='catch_phrase' placeholder='Catch Phrase'
                       onChange={(e) => setCatchPhrase(e.target.value)}
                       required/>
                <label>Superpowers</label>
                <SuperpowerSelect onChange={(e) => handleSuperpowerSelect(e)}/>
                <label>Images</label>
                <ImageInput onAdd={handleImageInputAdd} onDelete={handleImageInputDelete}/>
                <input type='submit'/>
            </form>
        </div>
    );
}

export default SuperheroForm;