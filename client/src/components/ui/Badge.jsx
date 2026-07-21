const colors = {
    Draft: "bg-gray-100 text-gray-700",
    Uploaded: "bg-blue-100 text-blue-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    "Feedback Sent": "bg-purple-100 text-purple-700"
};

export default function Badge({ status }) {
    return (
        <span
            className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                ${colors[status]}
            `}
        >
            {status}
        </span>
    );
}