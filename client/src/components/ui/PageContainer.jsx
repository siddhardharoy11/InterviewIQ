export default function PageContainer({
    children
}) {
    return (
        <div
            className="
                max-w-6xl
                mx-auto
            "
        >
            {children}
        </div>
    );
}