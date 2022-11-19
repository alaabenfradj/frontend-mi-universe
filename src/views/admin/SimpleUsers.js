import { useEffect } from "react";

// components

import CardTableReclamations from "components/Cards/CardTableReclamations";
import CardTableOfUsers from "components/Cards/CardTableOfUsers";
import { useDispatch } from "react-redux";
import { getAllRecs } from "app/reclamations/recSlice";
import { getAllUsers } from "app/usersSlice/adminSlice";
import TableSimpleUser from "components/Cards/TableSimpleUser";

export default function SimpleUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <TableSimpleUser color="light" />
        </div>
      </div>
     
    </>
  );
}
