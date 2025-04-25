import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteBlack from "../Icon/DeleteBlack";
import EditBlack from "../Icon/EditBlack";
import { deleteContactById, getContacts } from "../../api/ContactAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ContactList({ searchTerm }: { searchTerm: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const { mutate } = useMutation({
    mutationFn: deleteContactById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <div className="flex justify-center items-center h-full">Cargando...</div>;

  // Filtrar contactos según el término de búsqueda
  const filteredContacts = data?.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      contact.contactName.toLowerCase().includes(term) ||
      contact.contactEmail.toLowerCase().includes(term) ||
      contact.contactPhones.some((phone) => phone.includes(term))
    );
  });

  if (filteredContacts) return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tabla para pantallas grandes */}
      <div
        className="hidden lg:block flex-grow overflow-y-auto pb-4"
        style={{ maxHeight: "calc(100vh - 230px)" }}
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
            {filteredContacts.length ? (
              filteredContacts.map((contact, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-200 cursor-pointer transition-colors"
                  onClick={() => navigate(`/${contact._id}`)}
                >
                  <td className="px-6 py-7">
                    <div className="truncate max-w-[200px]" title={contact.contactName}>
                      {contact.contactName}
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    <div className="truncate max-w-[200px]" title={contact.contactEmail}>
                      {contact.contactEmail}
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    {contact.contactPhones[0]}
                    {contact.contactPhones.length > 1 && (
                      <span className="text-gray-500"> y {contact.contactPhones.length - 1} más</span>
                    )}
                  </td>
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
                  <td className="px-6 py-4 text-center">
                    <button
                      className="p-2 rounded-full hover:bg-green-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(location.pathname + `?editContact=${contact._id}`);
                      }}
                    >
                      <EditBlack />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-red-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        mutate(contact._id);
                      }}
                    >
                      <DeleteBlack />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="h-[300px]">
                  <div className="flex justify-center items-center h-full text-gray-500">
                    No hay contactos que coincidan con la búsqueda
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Versión móvil y tablet */}
      <div className="block lg:hidden">
        {filteredContacts.length ? (
          filteredContacts.map((contact, index) => (
            <div
              key={index}
              className="border-b p-4 hover:bg-gray-100 cursor-pointer transition-colors flex flex-col gap-2"
              onClick={() => navigate(`/${contact._id}`)}
            >
              <div className="flex justify-between items-center">
                {/* Nombre del contacto */}
                <h3
                  className="text-lg font-semibold text-gray-800 truncate max-w-[70%]" // Trunca el nombre si es muy largo
                  title={contact.contactName} // Muestra el nombre completo al pasar el mouse
                >
                  {contact.contactName}
                </h3>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-full hover:bg-green-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(location.pathname + `?editContact=${contact._id}`);
                    }}
                  >
                    <EditBlack />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-red-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      mutate(contact._id);
                    }}
                  >
                    <DeleteBlack />
                  </button>
                </div>
              </div>

              {/* Correo */}
              <p className="text-sm text-gray-600 truncate" title={contact.contactEmail}>
                {contact.contactEmail}
              </p>

              {/* Teléfono */}
              <p className="text-sm text-gray-600">
                {contact.contactPhones[0]}
                {contact.contactPhones.length > 1 && (
                  <span className="text-gray-500"> y {contact.contactPhones.length - 1} más</span>
                )}
              </p>
            </div>
          ))
        ) : (
          <div className="h-[300px] flex justify-center items-center text-gray-500">
            No hay contactos que coincidan con la búsqueda
          </div>
        )}
      </div>
    </div>
  );
}