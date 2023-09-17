import React from 'react';
import {SuperheroCardDataType} from "../../types/SuperheroCardData.type";
import ImageTitleCard from "../../components/ImageTitleCard";
import styles from '../../assets/css/pages/SuperheroesList.module.css'
import superheroPlaceholderImage from '../../assets/images/SuperheroPlaceholderImage.png'

function SuperheroesList(props: {superheroesData: SuperheroCardDataType[]}) {
    return (
        <>

            <div className={styles.wrapper}>
                {props.superheroesData && props.superheroesData ?
                    props.superheroesData.map((superhero) => {
                        return <a href={`/details/${superhero.id}`} key={superhero.id}>
                            <ImageTitleCard
                                image={superhero.image ? `data:image/jpeg;base64,${superhero.image}` : superheroPlaceholderImage}
                                title={superhero.nickname}/></a>
                    })
                    : null
                }
            </div>
        </>
    );
}

export default SuperheroesList;