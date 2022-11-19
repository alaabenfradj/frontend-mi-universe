import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../images/logo3.png";
import axios from "../../axiosInstance";

export default function PageInvoice() {
  interface RouteParams {
    id: string;
  }
  let { id } = useParams<RouteParams>();
  const [invoice, setInvoice] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/payment/${id}`);
      if (res.data.success) {
      }
      setInvoice(res.data.invoice);
    };
    fetchData();
  }, []);
  return (
    <div>
      {invoice !== null && (
        <LayoutPage subHeading="" headingEmoji="" heading="Invoice">
          <section>
            <div className="max-w-5xl mx-auto py-10 px-5 border bg-white">
              <article className="overflow-hidden">
                <div className="bg-[white] rounded-b-md">
                  <div className="space-y-6 px-4 text-slate-700">
                    <img className="object-cover h-12" src={logo} alt="logo" />
                    <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                      Invoice
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm px-4 font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Billed To
                      </p>
                      <p>
                        {invoice.customer.firstName} {invoice.customer.lastName}
                      </p>
                    </div>
                    <div className="text-right px-4 text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Invoice Number
                      </p>
                      <p>{invoice.paymentId}</p>
                      <p className="mt-2 text-sm font-normal text-slate-700">
                        Date of Issue
                      </p>
                      <p>{invoice.createdAt.slice(0, 9)}</p>
                    </div>

                    {/* <div className="text-sm font-light text-slate-500">
                  <p className="text-sm font-normal text-slate-700">
                    Terms
                  </p>
                  <p>0 Days</p>
                  <p className="mt-2 text-sm font-normal text-slate-700">
                    Due
                  </p>
                  <p>00.00.00</p>
                </div> */}
                  </div>
                </div>
                <div className="p-9">
                  <div className="flex flex-col mx-0 mt-8">
                    <table className="min-w-full divide-y divide-slate-500">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                          >
                            Label
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                          >
                            Brand
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.products.map((item, index) => (
                          <tr key={index} className="border-b border-slate-200">
                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                              <div className="font-medium text-slate-700">
                                {item.label}
                              </div>
                            </td>
                            <td className="px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              {item.category}
                            </td>
                            <td className="px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              {item.type}
                            </td>
                            <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                              ${item.price}
                            </td>
                          </tr>
                        ))}

                        {/* Here you can write more products/tasks that you want to charge for*/}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Subtotal
                          </th>
                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            ${invoice.amount - 5 - (invoice.amount * 5) / 100}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Shipping
                          </th>

                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            $5
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Tax
                          </th>

                          <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            ${(invoice.amount * 5) / 100}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                          >
                            Total
                          </th>

                          <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                            ${invoice.amount}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="mt-10 p-9">
                  <div className="border-t pt-9 border-slate-200">
                    <div className="text-sm font-light text-slate-700">
                      <p>
                        Payment terms are 14 days. Please be aware that
                        according to the Late Payment of Unwrapped Debts Act
                        0000, freelancers are entitled to claim a 00.00 late fee
                        upon non-payment of debts after this time, at which
                        point a new invoice will be submitted with the addition
                        of this fee. If payment of the revised invoice is not
                        received within a further 14 days, additional interest
                        will be charged to the overdue account and a statutory
                        rate of 8% plus Bank of England base of 0.5%, totalling
                        8.5%. Parties cannot contract out of the Act’s
                        provisions.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </LayoutPage>
      )}
    </div>
  );
}
