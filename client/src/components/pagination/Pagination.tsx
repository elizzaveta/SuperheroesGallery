import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import PaginationPagesDisplay from "./PaginationPagesDisplay";
import styles from "../../assets/css/components/Pagination.module.css"

function Pagination(props: {pages: number}) {
    const {pages} = props;
    let [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');
    const navigate = useNavigate();

    const handlePrevPage = () => {
        if (page > 1) handlePageNavigation(String(page - 1));
    }
    const handleNextPage = () => {
        if (pages && page < pages) handlePageNavigation(String(page + 1));
    }
    const handlePageNavigation = (targetPage: string) => {
        searchParams.set("page", targetPage)
        navigate({
            pathname: window.location.pathname,
            search: searchParams.toString()
        });
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.clickable} onClick={() => handlePrevPage()} >Previous</p>
            <PaginationPagesDisplay page={page} total={pages}/>
            <p className={styles.clickable} onClick={() => handleNextPage()}>Next</p>
        </div>
    );
}

export default Pagination;