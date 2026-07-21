import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function CandidateCard({ interview }) {
    return (
        <Card>
            <div className="space-y-5">

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Link>

                <div className="flex items-start justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            {interview.candidateName}
                        </h1>

                        <p className="mt-2 text-gray-500">
                            {interview.candidateEmail}
                        </p>

                    </div>

                    <Badge status={interview.status} />

                </div>

            </div>
        </Card>
    );
}