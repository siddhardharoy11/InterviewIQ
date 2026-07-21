import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import PageContainer from "../components/ui/PageContainer";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import Button from "../components/ui/Button";

import CandidateCard from "../components/interview/CandidateCard";
import ActionPanel from "../components/interview/ActionPanel";

import FileUploadCard from "../components/upload/FileUploadCard";

import useInterview from "../hooks/useInterview";
import useFileUpload from "../hooks/useFileUpload";

import useGenerateReport from "../hooks/useGenerateReport";

export default function InterviewDetails() {

    const { id } = useParams();

    const {

        interview,

        loading,

        error,

        reload

    } = useInterview(id);

    const resumeUpload =
        useFileUpload(id, "resume", reload);

    const jdUpload =
        useFileUpload(id, "job-description", reload);

    const audioUpload =
        useFileUpload(id, "audio", reload);

    const generate = useGenerateReport(id);

    if (loading) {

        return (

            <DashboardLayout>

                <LoadingSpinner
                    text="Loading interview..."
                />

            </DashboardLayout>

        );

    }

    if (error) {

        return (

            <DashboardLayout>

                <ErrorState

                    title="Unable to load interview"

                    description="Please try again."

                    action={

                        <Button onClick={reload}>

                            Retry

                        </Button>

                    }

                />

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <PageContainer>

                <div className="space-y-6">

                    <CandidateCard interview={interview} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    <FileUploadCard
        title="Resume"
        description="Upload PDF or DOCX"
        uploaded={!!interview.files.resume}
        accept=".pdf,.doc,.docx"
        loading={resumeUpload.loading}
        onFileSelect={resumeUpload.upload}
    />

    <FileUploadCard
        title="Job Description"
        description="Upload PDF or DOCX"
        uploaded={!!interview.files.jobDescription}
        accept=".pdf,.doc,.docx"
        loading={jdUpload.loading}
        onFileSelect={jdUpload.upload}
    />

    <FileUploadCard
        title="Interview Audio"
        description="Upload MP3, WAV or M4A"
        uploaded={!!interview.files.audio}
        accept=".mp3,.wav,.m4a"
        loading={audioUpload.loading}
        onFileSelect={audioUpload.upload}
    />

    <ActionPanel
        loading={generate.loading}
        onGenerate={generate.generate}
    />

</div>

                </div>

            </PageContainer>

        </DashboardLayout>

    );

}