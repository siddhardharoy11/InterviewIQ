export default function Card({
    title,
    children,
    className = ""
}) {
    return (
        <div
            className={`
                bg-white
                border
                border-gray-200
                rounded-xl
                p-6
                ${className}
            `}
        >
            {title && (
                <h2
                    className="
                        text-lg
                        font-semibold
                        mb-5
                    "
                >
                    {title}
                </h2>
            )}

            {children}

        </div>
    );
}