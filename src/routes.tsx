import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import { SurveyPage } from "./pages/SurveryPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/survey",
                element: <SurveyPage />,
            },
        ],
    },
]);
