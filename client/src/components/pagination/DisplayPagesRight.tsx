import React from 'react';
import DisplayPages from "./DisplayPages";

function DisplayPagesRight(props: {total: number }){
    const arrayLeft = [1, 2];
    const arrayRight = new Array(8);
    for (let i = props.total; i >= props.total - 8; i--) {
        arrayRight.unshift(i);
    }

    return (
        <DisplayPages left={arrayLeft} right={arrayRight} />
    )
}

export default DisplayPagesRight;