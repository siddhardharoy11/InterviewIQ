import Card from "../ui/Card";
import Button from "../ui/Button";

export default function UploadSection({
    title,
    description,
    onUpload,
}) {
    return (
        <Card title={title}>

            <p className="text-sm text-gray-500 mb-6">
                {description}
            </p>

            <Button onClick={onUpload}>
                Upload
            </Button>

        </Card>
    );
}