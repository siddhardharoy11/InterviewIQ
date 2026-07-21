import { Link } from "react-router-dom";

import Card from "./ui/Card";
import Badge from "./ui/Badge";

export default function InterviewCard({ interview }) {

    return (

        <Card className="hover:border-blue-300 transition">

            <div className="flex justify-between">

                <div>

                    <h3 className="font-semibold text-lg">

                        {interview.candidateName}

                    </h3>

                    <p className="text-gray-500">

                        {interview.candidateEmail}

                    </p>

                </div>

                <Badge status={interview.status} />

            </div>

            <div className="mt-6 flex justify-between items-center">

                <span className="text-sm text-gray-400">

                    {new Date(interview.createdAt)
                        .toLocaleDateString()}

                </span>

                <Link
                    to={`/interview/${interview._id}`}
                    className="
                        text-blue-600
                        font-medium
                    "
                >

                    Open →

                </Link>

            </div>

        </Card>

    );

}