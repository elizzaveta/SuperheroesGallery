import React, {useEffect, useState} from 'react';
import {SuperpowerType} from "../../types/Superpower.type";
import {getAllSuperpowers} from "../../api/superpowers/getAllSuperpowers";
import {createSuperpower} from "../../api/superpowers/createSuperpower";
import CreatableSelect from "react-select/creatable";
import {MultiValue} from "react-select";
function EditSuperpowerSelect(props: { superpowers: SuperpowerType[], onChange: (e:  MultiValue<{value: string, label: string}>)=>void }) {
    const [superpowersData, setSuperpowersData] = useState<SuperpowerType[]>(props.superpowers);
    const [selectedOptions, setSelectedOptions] = useState<{
        value: string,
        label: string
    }[]>(props.superpowers.map((superpower) => {
        return {value: superpower.id.toString(), label: superpower.name}
    }));
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);


    useEffect(() => {
        (async function () {
            await getAllSuperpowers()
                .then(data => setSuperpowersData(data));
        })();
    }, [])

    useEffect(() => {
        if (superpowersData) {
            setOptions(superpowersData?.map((superpower) => {
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
                setOptions(prevState => [...prevState, {value: data.id, label: data.name}]);
            })
    }

    return (
        <CreatableSelect
            isMulti
            name="superpowers"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onCreateOption={(inputedValue) => saveNewSuperpower(inputedValue)}
            onChange={(e) => props.onChange(e)}
            defaultValue={selectedOptions}
            placeholder='Start typing to select or create a superpower'
        />
    );
}

export default EditSuperpowerSelect;