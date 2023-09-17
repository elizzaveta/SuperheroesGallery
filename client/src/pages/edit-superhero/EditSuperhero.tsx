import React, {useEffect, useState} from 'react';
import EditSuperheroForm from "./EditSuperheroForm";
import {useParams} from "react-router-dom";
import {SuperheroType} from "../../types/Superhero.type";
import {getSuperheroById} from "../../api/superheroes/getSuperheroById";

function EditSuperhero() {
    const {id} = useParams();
    const [superheroData, setSuperheroData] = useState<SuperheroType>();
    useEffect(()=>{
        (async function (){
            if(id){
                await getSuperheroById(parseInt(id))
                    .then(data => setSuperheroData(data))
            }
        })()
    },[id])
    return (
        <div>
            <h1>Edit Superhero</h1>
            {superheroData ?
            <EditSuperheroForm superheroData={superheroData}/>
                :null
            }
        </div>
    );
}

export default EditSuperhero;