import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {SuperheroType} from "../../types/Superhero.type";
import {getSuperheroById} from "../../api/superheroes/getSuperheroById";
import SuperheroDetails from "./SuperheroDetails";
import ActionsBar from "../../components/ActionsBar";
import styles from '../../assets/css/pages/superhero-details/SuperheroDetailsPage.module.css'
import {deleteSuperhero} from "../../api/superheroes/deleteSuperhero";

function SuperheroDetailsPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [superheroData, setSuperheroData] = useState<SuperheroType>();

    useEffect(() => {
        (async function () {
            if (id != null) {
                await getSuperheroById(parseInt(id))
                    .then(data => setSuperheroData(data));
            }
        })();
    }, [id]);

    const handleDelete = async () => {
        const confirmResult = window.confirm('Are you sure you want to delete the superhero?');
        if (confirmResult && superheroData) {
            await deleteSuperhero(superheroData.id)
                .then(()=>navigate('/'));
        }
    }

    const handleEdit = ()=>{
        navigate(`/edit/${superheroData?.id}`);
    }

    return (
        <>{
            superheroData ?
                <div className={styles.wrapper}>
                    <ActionsBar className={styles.actionsBar} deleteCallback={handleDelete} editCallback={handleEdit}/>
                    <SuperheroDetails superheroData={superheroData}/>
                </div>
                : <h1>Not Found</h1>
        }
        </>
    );
}

export default SuperheroDetailsPage;