import { useEffect, useState } from "react";
import { getInterviews } from "../services/interviewService";

export default function useInterviews() {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function reload() {
        try {
            setLoading(true);

            const data = await getInterviews();

            setInterviews(data);

            setError(null);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        reload();
    }, []);

    return {
        interviews,
        loading,
        error,
        reload,
    };
}