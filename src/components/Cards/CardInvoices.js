import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components

import { useSelector } from "react-redux";
import PaginationSimple from "components/Pagination/PaginationSimple";
import Invoices from "./Invoices";
export default function CardInvoices({ color }) {
    const base_url = "http://localhost:5050/";
    const recs = useSelector(
        (state) => {
            return state.invoices.invoices;
        }
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

   
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recs.slice(indexOfFirstPost, indexOfLastPost);
    const lastPage = recs.length / postsPerPage;
    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);
    return (
        <>
            <Invoices invoices={currentPosts} color={color}></Invoices>
            <PaginationSimple
                lastPage={lastPage}
                postsPerPage={postsPerPage}
                totalPosts={recs.length}
                paginateBack={paginateBack}
                paginateFront={paginateFront}
                currentPage={currentPage}
            ></PaginationSimple>
        </>
    );
}

CardInvoices.defaultProps = {
    color: "light",
};

CardInvoices.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
