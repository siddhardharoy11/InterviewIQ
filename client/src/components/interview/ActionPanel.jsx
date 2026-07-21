import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ActionPanel({
    loading,
    onGenerate
}) {
    return (
        <Card title="AI Report">
            <p className="text-gray-500 mb-6">
                Generate an AI feedback report once all required files have been uploaded.
            </p>

            <Button
                onClick={onGenerate}
                disabled={loading}
            >
                {loading ? "Starting..." : "Generate AI Report"}
            </Button>
        </Card>
    );
}