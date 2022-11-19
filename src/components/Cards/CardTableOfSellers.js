import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import PaginationSimple from "components/Pagination/PaginationSimple";

// components


import Sellers from "./Sellers";

export default function CardTableOfSellers({ color }) {
    const usersFromStore = useSelector((state) => state.usersManagement.sellers);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentUsers = usersFromStore.slice(indexOfFirstPost, indexOfLastPost);
    const lastPage = Math.ceil(usersFromStore.length / postsPerPage);

    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);

    return (
        <>
            <Sellers color={color} users={currentUsers}></Sellers>
            <PaginationSimple
                lastPage={lastPage}
                postsPerPage={postsPerPage}
                totalPosts={usersFromStore.length}
                paginateBack={paginateBack}
                paginateFront={paginateFront}
                currentPage={currentPage}
            ></PaginationSimple>
        </>
    );
}

CardTableOfSellers.defaultProps = {
    color: "light",
};

CardTableOfSellers.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
