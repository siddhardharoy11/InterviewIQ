import { useState } from "react";

import toast from "react-hot-toast";

import { generateAIReport }
from "../services/interviewService";

export default function useGenerateReport(
    interviewId
) {

    const [loading, setLoading] =
        useState(false);

    async function generate() {

        try {

            setLoading(true);

            const report = await generateAIReport(interviewId);

            console.log(report);

            return report;

            toast.success(
            "AI report generated successfully."
        );

        }

        catch (err) {

            console.error(err);

            toast.error(
                err.response?.data?.message ||
                "Failed to generate report."
            );
        }

        finally {

            setLoading(false);

        }

    }

    return {

        loading,

        generate

    };

}