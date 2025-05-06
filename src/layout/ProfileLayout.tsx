import { Outlet } from "react-router-dom";
import Tabs from "../components/Profile/Tabs";

export default function ProfileLayout() {
    return (
        <>
            <Tabs />
            <div className="mx-auto py-4 sm:p-4 mb-auto">

                <Outlet />
            </div>
        </>
    )
}
