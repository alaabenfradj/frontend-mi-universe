import { useEffect } from "react";

// components

import { useDispatch } from "react-redux";
import { getAllSellers } from "app/usersSlice/adminSlice";
import CardTableOfSellers from "components/Cards/CardTableOfSellers";

export default function Sellers() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSellers());
    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTableOfSellers color="light" />
                </div>
            </div>

        </>
    );
}
