import { getAllInvoice } from "app/invoices/InvoiceSlice";
import CardInvoices from "components/Cards/CardInvoices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// components


export default function Invoices() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllInvoice());

    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardInvoices color="light" />
                </div>
            </div>
        </>
    );
}
