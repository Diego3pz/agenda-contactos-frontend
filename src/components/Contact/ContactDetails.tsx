import { Link } from "react-router-dom"
import { ContactFormData } from "../../types"

type ContactDetailsProps = {
    data: ContactFormData
}

export default function ContactDetails({ data }: ContactDetailsProps) {
    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Detalles del Contacto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div className="flex items-center">
                        <span className="font-semibold text-gray-600 w-32">Nombre:</span>
                        <span className="text-gray-800">{data.contactName}</span>
                    </div>

                    {/* Correo Electrónico */}
                    <div className="flex items-center">
                        <span className="font-semibold text-gray-600 w-32">Correo:</span>
                        <span className="text-gray-800">{data.contactEmail}</span>
                    </div>

                    {/* Teléfonos */}
                    <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32">Teléfonos:</span>
                        <div className="text-gray-800 space-y-1">
                            {data.contactPhones.map((phone, index) => (
                                <div key={index} className="bg-gray-100 px-3 py-1 rounded-md">
                                    {phone}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Direcciones */}
                    <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32">Direcciones:</span>
                        <div className="text-gray-800 space-y-1">
                            {data.contactAddress.map((address, index) => (
                                <div key={index} className="bg-gray-100 px-3 py-1 rounded-md">
                                    {address.street}, {address.city}, {address.postalCode}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Botón para volver */}
                <div className="mt-6 text-center">
                    <Link
                        to={'/'}
                        className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-200"
                    >
                        Volver a la lista de contactos
                    </Link>
                </div>
            </div>
        </div>
    );
}
