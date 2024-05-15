import { LandingPage } from "@/pages/LandingPage";
import { Toaster } from "sonner";

export default function App() {
    return (
        <>
            <Toaster richColors position="top-center" />
            <LandingPage />
        </>
    );
}
