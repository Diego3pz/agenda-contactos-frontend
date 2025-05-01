import { Outlet } from "react-router-dom";
import LogoBg from "../components/Icon/LogoBg";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    return (
        <>
            <div className=" bg-gray-800 min-h-screen flex items-center justify-center">
                <div className="py-10 lg:py-20 mx-auto w-[450px] px-5 lg:px-0">
                    <div className="w-full flex justify-center items-center">
                        <LogoBg />
                    </div>
                    <div className=" mt-5">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* ToastContainer */}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                style={{ zIndex: 50 }}
            />
        </>
    )
}
