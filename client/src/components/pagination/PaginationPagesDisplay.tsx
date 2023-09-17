import React from 'react';
import DisplayPagesPlain from "./DisplayPagesPlain";
import DisplayPagesLeft from "./DisplayPagesLeft";
import DisplayPagesRight from "./DisplayPagesRight";
import DisplayPagesCenter from "./DisplayPagesCenter";
import styles from "../../assets/css/components/Pagination.module.css"

function PaginationPagesDisplay(props: { page: number, total: number | undefined}){
    let pagination;

    if (props.total && props.total < 12) {
        pagination = <DisplayPagesPlain total={props.total}/>
    } else if (props.total) {
        if (props.page < 8) {
            pagination = <DisplayPagesLeft total={props.total}/>
        } else if (props.page > 34) {
            pagination = <DisplayPagesRight total={props.total}/>
        } else {
            pagination = <DisplayPagesCenter  total={props.total}/>
        }
    }

    return (
        <div className={styles.pages}>
            {pagination}
        </div>
    );
}




export default PaginationPagesDisplay;