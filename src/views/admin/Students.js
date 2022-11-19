import { useEffect } from "react";

// components

import { useDispatch } from "react-redux";
import { getAllStudents } from "app/usersSlice/adminSlice";
import CardTableOfStudents from "components/Cards/CardTableOfStudents";

export default function Students() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllStudents());
    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTableOfStudents color="light" />
                </div>
            </div>

        </>
    );
}
