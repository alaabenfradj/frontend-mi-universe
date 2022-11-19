import React, { useEffect } from "react";
import UserManagementDropDown from "components/Dropdowns/UserManagementDropDown";
import { useHistory } from "react-router-dom";

function SimpleUsers({ color, users }) {
    const history = useHistory;
    const base_url = "http://localhost:5050/";
    useEffect(() => {
        if (!users) {
            history.push("/mi")
        }
    }, [])
    return (
        <div
            style={{ marginTop: "75px" }}
            className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
            }
        >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3
                            className={
                                "font-semibold text-lg " +
                                (color === "light" ? "text-blueGray-700" : "text-white")
                            }
                        >
                            All Users
                        </h3>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                User name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                email
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Created at
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Manage
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users ? (users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                            <img
                                                className="w-full h-full rounded-full"
                                                src={base_url + user.profilePicture}
                                                alt={user.firstName}
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {user.userName}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {user.email}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {user.createdAt.substring(0, 10)}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {user.phoneNumber}
                                    </p>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {!user.isBlocked ? (
                                        <div className="">
                                            <i className="fas fa-circle text-emerald-500 mr-2"></i>{" "}
                                            <span className="text-blue-600 text-primary-500">
                                                active
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                                            <span className="text-blue-600">blocked</span>
                                        </div>
                                    )}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <UserManagementDropDown user={user} id={user._id} />
                                </td>
                            </tr>
                        ))) : (
                            <div>
                                not allowed
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SimpleUsers;
