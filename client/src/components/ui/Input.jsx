export default function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
    error = "",
    helperText = "",
    className = "",
}) {
    return (
        <div className="space-y-2">

            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}

                    {required && (
                        <span className="text-red-500 ml-1">*</span>
                    )}
                </label>
            )}

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                    w-full
                    rounded-lg
                    border
                    px-3
                    py-2.5
                    outline-none
                    transition
                    ${
                        error
                            ? "border-red-400 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                    }
                    ${
                        disabled
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-white"
                    }
                    ${className}
                `}
            />

            {error ? (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            ) : helperText ? (
                <p className="text-sm text-gray-500">
                    {helperText}
                </p>
            ) : null}

        </div>
    );
}