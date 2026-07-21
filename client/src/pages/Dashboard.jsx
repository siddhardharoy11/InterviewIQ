import DashboardLayout from "../layouts/DashboardLayout";

import useInterviews from "../hooks/useInterviews";

import InterviewCard from "../components/InterviewCard";

import EmptyState from "../components/EmptyState";

import PageHeader from "../components/ui/PageHeader";

import Button from "../components/ui/Button";

import { Link } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";

import ErrorState from "../components/ErrorState";


export default function Dashboard() {

const {

loading,

error,

reload,

interviews

} = useInterviews();

if (loading) {

    return (

        <DashboardLayout>

            <LoadingSpinner
                text="Loading interviews..."
            />

        </DashboardLayout>

    );

}

    return (

        <DashboardLayout>

            <PageHeader

                title="Interviews"

                subtitle="Manage candidate interviews"

                action={

                    <Link to="/new">

                        <Button>

                            New Interview

                        </Button>

                    </Link>

                }

            />

            {

                interviews.length === 0

                    ? (

                        <EmptyState />

                    )

                    : (

                        <div className="grid gap-4">

                            {

                                interviews.map(interview => (

                                    <InterviewCard

                                        key={interview._id}

                                        interview={interview}

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </DashboardLayout>

    );

}