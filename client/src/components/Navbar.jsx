export default function Navbar() {

    return (

        <header
            className="
                bg-white
                border-b
                border-gray-200
                px-8
                py-5
                flex
                justify-between
                items-center
            "
        >

            <div>

                <h2 className="font-semibold">
                    Recruiter Dashboard
                </h2>

            </div>

            <div
                className="
                    w-10
                    h-10
                    rounded-full
                    bg-blue-600
                    text-white
                    flex
                    items-center
                    justify-center
                    font-semibold
                "
            >

                SR

            </div>

        </header>

    );

}