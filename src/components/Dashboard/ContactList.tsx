import { useQuery } from "@tanstack/react-query";
import DeleteBlack from "../Icon/DeleteBlack";
import EditBlack from "../Icon/EditBlack";
import { getContacts } from "../../api/ContactAPI";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const navigate = useNavigate();

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
                    {/* Nombre */}
                    <td className="px-6 py-7">
                      <div className="truncate max-w-[200px]" title={contact.contactName}>
                        {contact.contactName}
                      </div>
                    </td>

                    {/* Correo Electrónico */}
                    <td className="px-6 py-7">
                      <div className="truncate max-w-[200px]" title={contact.contactEmail}>
                        {contact.contactEmail}
                      </div>
                    </td>

                    {/* Teléfono */}
                    <td className="px-6 py-7">
                      {contact.contactPhones[0]} {/* Mostrar el primer teléfono */}
                      {contact.contactPhones.length > 1 && (
                        <span className="text-gray-500"> y {contact.contactPhones.length - 1} más</span>
                      )}
                    </td>

                    {/* Dirección */}
                    <td className="px-6 py-7">
                      {contact.contactAddress[0] && (
                        <div
                          className="truncate max-w-[200px]"
                          title={`${contact.contactAddress[0].street}, ${contact.contactAddress[0].city}, ${contact.contactAddress[0].postalCode}`}
                        >
                          {contact.contactAddress[0].street}, {contact.contactAddress[0].city}, {contact.contactAddress[0].postalCode}
                        </div>
                      )}
                      {contact.contactAddress.length > 1 && (
                        <span className="text-gray-500"> y {contact.contactAddress.length - 1} más</span>
                      )}
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4 text-center">
                      <button
                        className="mx-2"
                        onClick={() => navigate(location.pathname + `?editContact=${contact._id}`)}
                      >
                        <EditBlack />
                      </button>
                      <button className="mx-2 text-red-500 hover:text-red-700">
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
                  className="flex justify-between items-center py-4 px-6 hover:bg-gray-50"
                >
                  <div>
                    {/* Nombre */}
                    <p className="text-lg font-medium text-gray-800 truncate max-w-[150px]" title={contact.contactName}>
                      {contact.contactName}
                    </p>

                    {/* Correo Electrónico */}
                    <p className="text-sm text-gray-500 truncate max-w-[150px]" title={contact.contactEmail}>
                      {contact.contactEmail}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <button
                      className="mx-2"
                      onClick={() => navigate(location.pathname + `?editContact=${contact._id}`)}
                    >
                      <EditBlack />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <DeleteBlack />
                    </button>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center h-[300px] text-gray-500">
              No hay contactos aún
            </div>
          )}
        </ul>
      </div>

    </div>
  );
}