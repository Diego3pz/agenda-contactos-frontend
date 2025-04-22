import { useQuery } from "@tanstack/react-query";
import DeleteBlack from "../Icon/DeleteBlack";
import EditBlack from "../Icon/EditBlack";
import { getContacts } from "../../api/ContactAPI";

export default function ContactList() {

  const { data, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts
  })

  if (isLoading) return <div className="flex justify-center items-center h-full">Cargando...</div>;

  if (data) return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">

      {/* Tabla para pantallas grandes */}
      <div
        className="hidden md:block flex-grow overflow-y-auto pb-4"
        style={{ maxHeight: "calc(100vh - 230px)" }} // Ajusta el valor según el tamaño del header y footer
      >
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100 sticky top-0 shadow z-[1]">
            <tr>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Correo Electrónico</th>
              <th className="px-6 py-4">Teléfono</th>
              <th className="px-6 py-4">Dirección</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              <>
                {data.map((contact, index) => (
                  <tr key={index} className="border-t hover:bg-gray-200 cursor-pointer transition-colors">
                    <td className="px-6 py-7">{contact.contactName}</td>
                    <td className="px-6 py-7">{contact.contactEmail}</td>
                    <td className="px-6 py-7">{contact.contactPhones}</td>
                    <td className="px-6 py-7">
                      {contact.contactAddress.map((address, idx) => (
                        <div
                          key={idx}
                          className="truncate max-w-[200px]"
                          title={`${address.street}, ${address.city}, ${address.postalCode}`}
                        >
                          {address.street}, {address.city}, {address.postalCode}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className=" mx-2">
                        <EditBlack />
                      </button>
                      <button className=" mx-2">
                        <DeleteBlack />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={5} className="h-[300px]">
                  <div className="flex justify-center items-center h-full text-gray-500">
                    No hay contactos aún
                  </div>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* Lista para pantallas pequeñas */}
      <div
        className="block md:hidden flex-grow overflow-y-auto pb-4 border-t "
        style={{ maxHeight: "calc(100vh - 200px)" }} 
      >
        <ul className="divide-y divide-gray-200">
          {data.length ? (
            <>
              {data.map((contact, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-4 px-6 hover:bg-gray-50 "
                >
                  <div>

                    <p className="text-lg font-medium text-gray-800">{contact.contactName}</p>
                    <p className="text-sm text-gray-500">{contact.contactEmail}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <EditBlack />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <DeleteBlack />
                    </button>
                  </div>
                </li>
              ))}</>
          ) : (
            <div className="flex justify-center items-center h-[300px] text-gray-500">
              No hay contactos aún
            </div>
          )
          }

        </ul>
      </div>
    </div>
  );
}