import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components

import { useSelector } from "react-redux";
import PaginationSimple from "components/Pagination/PaginationSimple";
import SimpleUsers from "./SimpleUsers";
export default function TableSimpleUser({ color }) {
    const usersFromStore = useSelector((state) => state.usersManagement.users);

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
            <SimpleUsers users={currentUsers} color={color}></SimpleUsers>
            <PaginationSimple
                lastPage={lastPage}
                postsPerPage={postsPerPage}
                totalPosts={currentUsers.length}
                paginateBack={paginateBack}
                paginateFront={paginateFront}
                currentPage={currentPage}
            ></PaginationSimple>
        </>
    );
}

TableSimpleUser.defaultProps = {
    color: "light",
};

TableSimpleUser.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
