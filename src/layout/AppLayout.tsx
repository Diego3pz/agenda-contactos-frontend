import { Navigate, Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LogoBgDashboard from "../components/Icon/LogoBgDashboard";
import { useAuth } from "../hooks/useAuth";


export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    if (isLoading) return 'Cargando...'
    if (isError) {
        return <Navigate to="/auth/login" />
    }

    if (data) return (
        <>
            <div className="flex flex-col min-h-screen">
                <header className="bg-gray-800 text-white py-2 sm:py-4 fixed top-0 w-full z-10">
                    <div className="container mx-auto flex justify-between items-center  sm:px-6">

                        <div className="flex items-center gap-4 lg:uppercase ml-2 ">
                            <LogoBgDashboard />
                            <h1 className="text-lg sm:text-xl font-bold">Agenda de Contactos</h1>
                        </div>
                        <div className="flex items-center ">
                            <NavMenu 
                                name={data.name}
                            />
                        </div>
                    </div>
                </header>


                <main className="flex-grow overflow-y-auto mt-6 sm:mt-10">
                    <div className="container mx-auto px-4 mt-8 py-2">
                        <Outlet />
                    </div>
                </main>


                <footer className="bg-gray-800 text-white py-2 sm:py-4 fixed bottom-0 w-full z-10">
                    <div className="container mx-auto text-center text-sm sm:text-base">
                        <p>&copy; {new Date().getFullYear()} Agenda de Contactos</p>
                    </div>
                </footer>


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