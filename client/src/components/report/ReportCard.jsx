import Card from "../ui/Card";

export default function ReportCard({ report }) {
    return (
        <div className="lg:col-span-2 space-y-6">

            <Card title="Overall Score">
                <div className="text-5xl font-bold text-blue-600">
                    {report.scores?.overall ?? "N/A"}/10
                </div>
            </Card>

            <Card title="Summary">
                <p>{report.summary}</p>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">

                <Card title="Strengths">
                    <ul className="list-disc pl-5 space-y-2">
                        {report.strengths?.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </Card>

                <Card title="Weaknesses">
                    <ul className="list-disc pl-5 space-y-2">
                        {report.weaknesses?.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </Card>

                <Card title="Recommendations">
                    <ul className="list-disc pl-5 space-y-2">
                        {report.recommendations?.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </Card>

            </div>

            <Card title="Scores">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>Technical<br /><b>{report.scores?.technical?.score ?? "N/A"}</b></div>
                    <div>Communication<br /><b>{report.scores?.communication?.score ?? "N/A"}</b></div>
                    <div>Problem Solving<br /><b>{report.scores?.problemSolving?.score ?? "N/A"}</b></div>
                    <div>Behavioral<br /><b>{report.scores?.behavioral?.score ?? "N/A"}</b></div>
                    <div>Resume Match<br /><b>{report.scores?.resumeMatch?.score ?? "N/A"}</b></div>
                </div>
            </Card>

        </div>
    );
}