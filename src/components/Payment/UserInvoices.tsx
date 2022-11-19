// export default function UserInvoices() {
//     return (

//     )
// }

import LayoutPage from "components/LayoutPage/LayoutPage";
import { FC, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import axios from "../../axiosInstance";

export interface InvoiceProps {
  className?: string;
}
const UserInvoices: FC<InvoiceProps> = ({ className = "" }) => {
  const [invoices, setInvoices] = useState(null);

  const getInvoices = async () => {
    const response = await axios.get("/payment").catch((err) => {
      if (err && err.response) {
        setInvoices(null);
      }
    });
    if (response && response.data.success) {
      setInvoices(response.data.invoices);
    }
  };

  const deleteInvoice = (id) => {
    axios
      .delete(`payment/${id}`)
      .then((res) => {
        if (res.data.success) {
          getInvoices();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to Mi universe"
        headingEmoji=""
        heading="Invoices Lsit"
      >
        <div className="container" style={{ padding: "50px" }}>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {invoices != null ? (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Invoice Reference
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Number of products
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((element, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          {element.paymentId}
                        </th>
                        <td className="px-6 py-4">{element.products.length}</td>
                        <td className="px-6 py-4">
                          {element.createdAt.substring(0, 10)}
                        </td>
                        <td className="px-6 py-4">${element.amount}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteInvoice(element._id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h1>No invoices found !</h1>
            )}
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default UserInvoices;
