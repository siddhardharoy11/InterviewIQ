import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateInterview from "./pages/CreateInterview";
import InterviewDetails from "./pages/InterviewDetails";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<CreateInterview />} />
            <Route path="/interview/:id" element={<InterviewDetails />} />
        </Routes>
    );
}

export default App;