import { useEffect } from "react";

// components

import CardTableReclamations from "components/Cards/CardTableReclamations";
import { useDispatch } from "react-redux";
import { getAllRecs } from "app/reclamations/recSlice";

export default function Reclamations() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllRecs());
    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTableReclamations color="light" />
                </div>
            </div>
        </>
    );
}
