import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import { getContactById } from "../../api/ContactAPI";
import EditContactModal from "./EditContactModal";


export default function EditContactData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const contactId = queryParams.get('editContact');

    // Validar si contactId es null
    if (!contactId) {
        return <Navigate to="/" />; // Redirigir al usuario si no hay contactId
    }

    const { data, isError } = useQuery({
        queryKey: ['editContact', contactId],
        queryFn: () => getContactById(contactId),
        retry: false,
        enabled: !!contactId, // Solo ejecutar si contactId es válido
    });

    if (isError) return <Navigate to="/404" />;
    if (data) return <EditContactModal data={data} contactId={contactId} />;
}
