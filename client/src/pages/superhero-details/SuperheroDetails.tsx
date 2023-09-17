import React from 'react';
import {SuperheroType} from "../../types/Superhero.type";
import styles from '../../assets/css/pages/superhero-details/SuperheroDetails.module.css'
import PurpleBadge from "../../components/PurpleBadge";
import ImagesContainer from "../../components/ImagesContainer";

function SuperheroDetails(props: {superheroData: SuperheroType}) {
    return (
        <div className={styles.wrapper}>
            <h1>{props.superheroData.nickname}</h1>
            <p><span className={styles.standoutText}>Real Name:</span> {props.superheroData.real_name}</p>
            <p><span
                className={styles.standoutText}>Origin Description:</span> {props.superheroData.origin_description}
            </p>

            <div className={styles.flexContainer}>
                <p className={styles.standoutText}>Superpowers:</p>
                {props.superheroData.superpowers.map(superpower => {
                    return <PurpleBadge text={superpower.name} key={superpower.id}/>
                })}
            </div>
            <p><span className={styles.standoutText}>Catch Phrase:</span> {props.superheroData.catch_phrase}</p>
            <ImagesContainer images={props.superheroData.images}/>
        </div>
    );
}

export default SuperheroDetails;