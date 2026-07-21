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

            await generateAIReport(
                interviewId
            );

            toast.success(
                "AI analysis started."
            );

        }

        catch (err) {

            toast.error(
                "Failed to start analysis."
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