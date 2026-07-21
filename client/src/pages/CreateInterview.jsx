import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import toast from "react-hot-toast";

import { createInterview } from "../services/interviewService";

export default function CreateInterview() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        candidateName: "",
        candidateEmail: ""
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));

    }
    function validate() {

    const newErrors = {};

    if (!formData.candidateName.trim()) {
        newErrors.candidateName = "Candidate name is required.";
    }

    if (!formData.candidateEmail.trim()) {
        newErrors.candidateEmail = "Candidate email is required.";
    }
    else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.candidateEmail)
    ) {
        newErrors.candidateEmail = "Enter a valid email.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
}

async function handleSubmit(e) {

    e.preventDefault();

    if (!validate()) return;

    try {

        setLoading(true);

        const interview = await createInterview(formData);

        toast.success("Interview created");

        navigate(`/interview/${interview._id}`);

    }
    catch (err) {

        toast.error(
            err.message || "Failed to create interview."
        );

    }
    finally {

        setLoading(false);

    }

}

    return (

        <DashboardLayout>

<PageContainer>

    <PageHeader
        title="New Interview"
        subtitle="Create a new candidate interview"
    />

    <Card title="Candidate Information">

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <Input
                label="Candidate Name"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleChange}
                required
                error={errors.candidateName}
                placeholder="John Doe"
            />

            <Input
                label="Candidate Email"
                name="candidateEmail"
                type="email"
                value={formData.candidateEmail}
                onChange={handleChange}
                required
                error={errors.candidateEmail}
                placeholder="john@example.com"
            />

            <div className="flex justify-end gap-3">

                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Interview"}
                </Button>

            </div>

        </form>

    </Card>

</PageContainer>

        </DashboardLayout>

    );

}