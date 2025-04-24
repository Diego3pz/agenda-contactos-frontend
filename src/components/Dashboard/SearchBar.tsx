import { useNavigate } from "react-router-dom";
import AddContactModal from "../Contact/AddContactModal";

export default function SearchBar() {

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center bg-gray-100 rounded-lg shadow-md px-3 py-2 sm:px-4 sm:py-2 w-full">
        {/* Input de búsqueda */}
        <div className="flex items-center flex-grow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l7 7"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar"
            className="ml-2 bg-transparent outline-none text-gray-700 text-sm sm:text-base w-full"
          />
        </div>

        {/* Botón de nuevo */}
        <button className="bg-orange-400 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-orange-500 transition-all ml-2 sm:ml-4 text-sm sm:text-base"
          onClick={() => navigate('?newContact=true')}
        >
          Nuevo
        </button>
      </div>

      
    </>
  );
}