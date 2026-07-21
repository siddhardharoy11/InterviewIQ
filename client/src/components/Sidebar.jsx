import { NavLink } from "react-router-dom";

const links = [
    {
        name: "Dashboard",
        path: "/"
    },
    {
        name: "New Interview",
        path: "/new"
    }
];

export default function Sidebar() {

    return (
        <aside className="w-64 bg-white border-r border-gray-200">

            <div className="px-6 py-6">

                <h1 className="text-xl font-bold">
                    InterviewIQ
                </h1>

            </div>

            <nav className="px-3">

                {links.map(link => (

                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `
                            block
                            px-4
                            py-3
                            rounded-lg
                            mb-1
                            text-sm
                            font-medium
                            transition

                            ${
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100"
                            }
                            `
                        }
                    >

                        {link.name}

                    </NavLink>

                ))}

            </nav>

        </aside>
    );
}