import { Navigate, useParams } from "react-router-dom";
import ContactDetails from "../components/Contact/ContactDetails";
import { getContactById } from "../api/ContactAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export default function ContactView() {
    const params = useParams()
    const contactId = params.contactId!
    const queryClient = useQueryClient();


    const { data, isLoading, isError } = useQuery({
        queryKey: ["contact", contactId],
        queryFn: () => getContactById(contactId),
        initialData: queryClient.getQueryData(["contact", contactId]),
    });

    if (isLoading) return <div className="flex justify-center items-center h-full">Cargando...</div>;
    if (isError) return <Navigate to={'/404'} />
    if (data) return (
        <>
            <div className="container mx-auto py-4 sm:p-4   mt-4 mb-auto">
                <ContactDetails data={data} />
            </div>
        </>
    )
}
