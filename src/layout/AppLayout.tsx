import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddContactModal from "../components/Contact/AddContactModal";
import EditContactData from "../components/Contact/EditContactData";

export default function AppLayout() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-gray-800 text-white py-2 sm:py-4 fixed top-0 w-full z-10">
                    <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
                        <h1 className="text-lg sm:text-xl font-bold">Agenda de Contactos</h1>
                        <div className="flex items-center">
                            <NavMenu />
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-grow overflow-y-auto mt-6 sm:mt-10">
                    <div className="container mx-auto px-4 py-2">
                        <Outlet />
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-2 sm:py-4 fixed bottom-0 w-full z-10">
                    <div className="container mx-auto text-center text-sm sm:text-base">
                        <p>&copy; {new Date().getFullYear()} Agenda de Contactos</p>
                    </div>
                </footer>

                {/* ToastContainer */}
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    pauseOnHover={false}
                    pauseOnFocusLoss={false}
                    style={{ zIndex: 50 }}
                />
            </div>
            
        </>
    );
}