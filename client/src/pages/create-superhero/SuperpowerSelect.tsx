import React, {useEffect, useState} from 'react';
import CreatableSelect from "react-select/creatable";
import {getAllSuperpowers} from "../../api/superpowers/getAllSuperpowers";
import {SuperpowerType} from "../../types/Superpower.type";
import {createSuperpower} from "../../api/superpowers/createSuperpower";
import {MultiValue} from "react-select";

function SuperpowerSelect(props: {onChange: (e:  MultiValue<{value: string, label: string}>)=>void}) {
    const [superpowersData, setSuperpowersData] = useState<SuperpowerType[]>();
    const [options, setOptions] = useState<{value: string, label: string}[]>([]);

    useEffect(()=>{
        (async function(){
            await getAllSuperpowers()
                .then(data => setSuperpowersData(data));
        })();
    },[])

    useEffect(()=>{
        if(superpowersData){
            setOptions(superpowersData?.map((superpower)=>{
                return {
                    value: superpower.id.toString(),
                    label: superpower.name
                }
            }));
        }
    }, [superpowersData])

    async function saveNewSuperpower(value: string) {
        await createSuperpower(value)
            .then(data => {
                setOptions(prevState => [...prevState, { value: data.id, label: data.name }]);
            })
    }

    return (
        <CreatableSelect
            isMulti
            name="superpowers"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onCreateOption={(inputedValue)=>saveNewSuperpower(inputedValue)}
            onChange={(e)=>props.onChange(e)}
            // defaultValue={}
            placeholder='Start typing to select or create a superpower'
        />
    );
}

export default SuperpowerSelect;