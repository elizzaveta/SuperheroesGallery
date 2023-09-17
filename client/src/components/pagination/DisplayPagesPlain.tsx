import React from 'react';
import DisplayPages from "./DisplayPages";

function DisplayPagesPlain(props: {total: number}){
    let array = new Array(props.total);
    for (let i = 1; i <= props.total; i++) {
        array.push(i);
    }
    return (
        <DisplayPages left={array}/>
    )
}

export default DisplayPagesPlain;