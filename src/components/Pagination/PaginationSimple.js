import Button from "components/Button/Button";
import ButtonPrimary from "components/Button/ButtonPrimary";
import React from "react";

const PaginationSimple = ({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
  lastPage,
}) => {
  return (
    <div className="py-2">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium"> {currentPage * postsPerPage - 5} </span>
          to
          {currentPage * postsPerPage <= totalPosts ? (
            <span className="font-medium"> {currentPage * postsPerPage} </span>
          ) : (
            <span className="font-medium">  {totalPosts} </span>
          )}
          of
          <span className="font-medium">  {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block"></nav>
      <div>
        <nav
          className="relative z-0 inline-flex  rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => {
                paginateBack();
              }}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous

            </button>

            <button disabled={currentPage === lastPage}
              onClick={() => {
                paginateFront();
              }} className="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default PaginationSimple;
