import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export const HomePage = () => {
    return (
        <div>
            <Toaster richColors position="top-center" />
            <Outlet />
        </div>
    );
};
