import React, {useEffect, useState} from 'react';
import {getAllSuperheroes} from "../../api/superheroes/getAllSuperheroes";
import {SuperheroCardDataType} from "../../types/SuperheroCardData.type";
import SuperheroesList from "./SuperheroesList";
import Pagination from "../../components/pagination/Pagination";
import {useSearchParams} from "react-router-dom";
import styles from "../../assets/css/pages/SuperheroesList.module.css";
import InfoMessageBlock from "../../components/InfoMessageBlock";

type responseType = {
    count: number,
    data: SuperheroCardDataType[]
}

function SuperheroesGalleryPage() {
    let [searchParams] = useSearchParams();
    const [superheroesData, setSuperheroesData] = useState<responseType>();

    useEffect(() => {
        (async function () {
            await getAllSuperheroes(parseInt(searchParams.get('page') || '1'))
                .then(data => setSuperheroesData(data));
        })();
    }, [searchParams])
    return (
        <>{
            superheroesData ?
                <>
                    <div className={styles.nav}>
                        <a href='/new-superhero'>+ New Superhero</a>
                    </div>
                    {
                        superheroesData.data.length ?
                            <>
                                <SuperheroesList superheroesData={superheroesData.data}/>
                                <Pagination pages={Math.ceil((superheroesData.count) / 5)}/>
                            </>
                            : <InfoMessageBlock
                                text='No superheroes in the database. Start by clicking New Superhero button.'/>
                    }
                </>
                : null
        }
        </>
    );
}

export default SuperheroesGalleryPage;