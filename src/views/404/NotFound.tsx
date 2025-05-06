import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <>
            <h1 className="font-black text-center text-4xl text-white">Pagina no encontrada</h1>
            <p className="mt-10 text-center text-orange-500 hover:text-orange-700 transition-colors">
                <Link to='/' className="">Volver a la pagina de inicio</Link>
            </p>
        </>
    )
}
