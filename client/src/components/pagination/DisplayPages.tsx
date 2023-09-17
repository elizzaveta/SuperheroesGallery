import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import styles from "../../assets/css/components/Pagination.module.css";


function DisplayPages(props: {left: number[], right?: number[], center?: number[]}){
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')||'1');
    const [currentPage, setCurrentPage] = useState(page)

    useEffect(() => {
        const prevPageElement: HTMLElement | null = document.getElementById('page' + currentPage);
        const currentPageElement: HTMLElement | null = document.getElementById('page' + page);
        if (currentPageElement && prevPageElement) {
            prevPageElement.className = "";
            currentPageElement.className = styles.currentPage
        }
        setCurrentPage(page)
    }, [currentPage, searchParams, page])

    const handleNavigation = (page: number) => {
        searchParams.set("page", String(page))
        navigate({
            pathname: window.location.pathname,
            search: searchParams.toString()
        });
        document.getElementById("topView")?.scrollIntoView({behavior: "smooth"})
    }
    return (
        <>
            <MapPages array={props.left} onClick={handleNavigation}/>
            {props.center &&
                <>
                    <p>...</p>
                    <MapPages array={props.center} onClick={handleNavigation}/>
                </>

            }
            {props.right &&
                <>
                    <p>...</p>
                    <MapPages array={props.right} onClick={handleNavigation}/>
                </>
            }
        </>
    )
}

const MapPages = (props:{array:number[], onClick:(page:number)=>void})=>{
    return(
        <>
            {props.array && props.array.map((page) => {
                return (
                    <p key={page} id={'page' + page} onClick={() => {props.onClick(page)}}>{page}</p>
                )
            })}
        </>
    )
}
export default DisplayPages;