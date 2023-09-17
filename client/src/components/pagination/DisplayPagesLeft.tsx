import React from 'react';
import DisplayPages from "./DisplayPages";

function DisplayPagesLeft(props: { total: number }){
    const arrayLeft = [1, 2, 3, 4, 5, 6, 7, 8];
    const arrayRight = [props.total - 1, props.total];

    return (
        <DisplayPages left={arrayLeft} right={arrayRight}/>
    )
}

export default DisplayPagesLeft;