import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../Icon/Search";

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Llama a la función de búsqueda
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-lg shadow-md px-3 py-2 sm:px-4 sm:py-2 w-full">
      {/* Input de búsqueda */}
      <div className="flex items-center flex-grow">
        <Search />
        <input
          type="text"
          placeholder="Buscar por nombre, correo o teléfono"
          className=" border-none ml-2 bg-transparent outline-none text-gray-700 text-sm sm:text-base w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Botón de nuevo */}
      <button
        className="bg-orange-400 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-orange-500 transition-all ml-2 sm:ml-4 text-sm sm:text-base"
        onClick={() => navigate("?newContact=true")}
      >
        Nuevo
      </button>
    </div>
  );
}