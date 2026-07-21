import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function EmptyState() {

    return (

        <div
            className="
                border-2
                border-dashed
                rounded-xl
                p-20
                text-center
                bg-white
            "
        >

            <h2
                className="
                    text-2xl
                    font-semibold
                "
            >
                No Interviews Yet
            </h2>

            <p
                className="
                    text-gray-500
                    mt-3
                    mb-8
                "
            >

                Create your first interview to begin.

            </p>

            <Link to="/new">

                <Button>

                    Create Interview

                </Button>

            </Link>

        </div>

    );

}