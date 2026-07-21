import { useEffect, useState } from "react";
import { getInterview } from "../services/interviewService";

export default function useInterview(id) {
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function loadInterview() {
        try {
            setLoading(true);
            setError(null);

            const data = await getInterview(id);
            setInterview(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadInterview();
    }, [id]);

    return {
        interview,
        loading,
        error,
        reload: loadInterview,
    };
}