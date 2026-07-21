export default function ErrorState({
    title = "Something went wrong.",
    description = "Please try again.",
    action
}) {

    return (

        <div
            className="
                bg-white
                border
                border-red-200
                rounded-xl
                p-10
                text-center
            "
        >

            <h2
                className="
                    text-xl
                    font-semibold
                    text-red-600
                "
            >
                {title}
            </h2>

            <p
                className="
                    mt-3
                    text-gray-500
                "
            >
                {description}
            </p>

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}

        </div>

    );

}