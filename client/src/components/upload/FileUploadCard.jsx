import { useRef } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

export default function FileUploadCard({
    title,
    description,
    uploaded,
    accept,
    loading,
    onFileSelect
}) {
    const inputRef = useRef(null);

    function handleChange(e) {
        const selected = e.target.files?.[0];

        if (!selected) return;

        onFileSelect(selected);
    }

    return (
        <Card>
            <div className="space-y-5">

                <div className="flex items-start justify-between">

                    <div>

                        <h3 className="text-lg font-semibold">
                            {title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>

                    </div>

                    {uploaded ? (
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                            <CheckCircle size={16} />
                            Uploaded
                        </span>
                    ) : (
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                            Missing
                        </span>
                    )}

                </div>

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept={accept}
                    onChange={handleChange}
                />

                <div
                    className="
                        border-2
                        border-dashed
                        rounded-xl
                        p-8
                        text-center
                        transition-all
                        hover:border-blue-500
                        hover:bg-blue-50
                    "
                >

                    <FileText
                        size={42}
                        className="mx-auto text-blue-500 mb-4"
                    />

                    <p className="font-medium">
                        Drag & Drop your file
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        or click Browse Files
                    </p>

                </div>

                <Button
                    className="w-full"
                    onClick={() => inputRef.current?.click()}
                    disabled={loading}
                >
                    <Upload size={18} />

                    {loading
                        ? "Uploading..."
                        : uploaded
                        ? "Replace File"
                        : "Browse Files"}
                </Button>

            </div>
        </Card>
    );
}