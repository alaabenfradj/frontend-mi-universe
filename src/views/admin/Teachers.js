import { useEffect } from "react";

// components

import CardTableOfUsers from "components/Cards/CardTableOfUsers";
import { useDispatch } from "react-redux";
import { getAllTeachers } from "app/usersSlice/adminSlice";
import CardTableOfTeachers from "components/Cards/CardTableOfTeachers";

export default function Teachers() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTeachers());
    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTableOfTeachers color="light" />
                </div>
            </div>

        </>
    );
}
