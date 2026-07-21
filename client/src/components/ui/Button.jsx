const variants = {
    primary:
        "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
        "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",

    danger:
        "bg-red-600 text-white hover:bg-red-700"
};

export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            className={`
                px-4
                py-2.5
                rounded-lg
                font-medium
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}