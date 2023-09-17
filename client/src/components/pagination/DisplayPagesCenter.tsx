import React from 'react';
import {useSearchParams} from "react-router-dom";
import DisplayPages from "./DisplayPages";

function DisplayPagesCenter(props: {total: number }) {
    let [searchParams] = useSearchParams();
    const page: number = parseInt(searchParams.get("page") || '1')


    const arrayLeft = [1, 2];
    const arrayRight = [props.total - 1, props.total];
    const arrayCenter = [page - 2, page - 1, page, page + 1, page + 2]
    return (
        <DisplayPages left={arrayLeft} center={arrayCenter} right={arrayRight}/>
    )
}

export default DisplayPagesCenter;