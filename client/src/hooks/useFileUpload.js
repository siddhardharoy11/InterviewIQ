import { useState } from "react";

import toast from "react-hot-toast";

import { uploadInterviewFile }
    from "../services/interviewService";

export default function useFileUpload(
    interviewId,
    type
) {

    const [loading, setLoading] =
        useState(false);

    async function upload(file) {

        try {

            setLoading(true);

            await uploadInterviewFile(

                interviewId,

                type,

                file

            );

            toast.success("Upload successful");

        }

        catch (err) {

            toast.error(

                err.message ||

                "Upload failed"

            );

        }

        finally {

            setLoading(false);

        }

    }

    return {

        upload,

        loading

    };

}