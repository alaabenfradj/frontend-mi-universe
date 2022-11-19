import { useEffect } from "react";

// components

import CardTableOfUsers from "components/Cards/CardTableOfUsers";
import { useDispatch } from "react-redux";
import { getAllUsers } from "app/usersSlice/adminSlice";

export default function Tables() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableOfUsers color="light" />
        </div>
      </div>
     
    </>
  );
}
