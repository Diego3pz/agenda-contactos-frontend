import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ContactFormData } from "../../types";

type ContactFormProps = {
    register: UseFormRegister<ContactFormData>;
    errors: FieldErrors<ContactFormData>;
    contactPhones: string[];
    contactAddress: { street: string; city: string; postalCode: string }[];
    addPhoneField: () => void;
    removePhoneField: (index: number) => void;
    addAddressField: () => void;
    removeAddressField: (index: number) => void;
};

export default function ContactForm({
    register,
    errors,
    contactPhones,
    contactAddress,
    addPhoneField,
    removePhoneField,
    addAddressField,
    removeAddressField,
}: ContactFormProps) {
    return (
        <>
            {/* Nombre */}
            <div className="mb-5 space-y-3">
                <label htmlFor="contactName" className="text-sm uppercase font-bold">
                    Nombre
                </label>
                <input
                    id="contactName"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    type="text"
                    placeholder="Nombre"
                    {...register("contactName", {
                        required: "El nombre es obligatorio",
                    })}
                />
                {errors.contactName && (
                    <ErrorMessage>{errors.contactName.message}</ErrorMessage>
                )}
            </div>

            {/* Correo */}
            <div className="mb-5 space-y-3">
                <label htmlFor="contactEmail" className="text-sm uppercase font-bold">
                    Correo
                </label>
                <input
                    id="contactEmail"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    type="email"
                    placeholder="Correo electrónico"
                    {...register("contactEmail", {
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "El correo no es válido",
                        },
                    })}
                />
                {errors.contactEmail && (
                    <ErrorMessage>{errors.contactEmail.message}</ErrorMessage>
                )}
            </div>

            {/* Teléfonos */}
            <div className="mb-5">
                <label className="text-sm uppercase font-bold">Teléfono</label>
                {contactPhones.map((_, index) => (
                    <div key={index} className="mt-2">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-300">
                            <input
                                type="text"
                                placeholder="Teléfono"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-3"
                                {...register(`contactPhones.${index}`, {
                                    validate: (value) =>
                                        value.trim() !== "" || "El teléfono es obligatorio",
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => removePhoneField(index)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        {errors.contactPhones?.[index] && (
                            <ErrorMessage>{errors.contactPhones[index]?.message}</ErrorMessage>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addPhoneField}
                    className="mt-2 w-full flex items-center justify-center text-blue-600 bg-gray-100 hover:bg-blue-100 rounded-md py-2 text-sm font-medium"
                >
                    + Añadir Teléfono
                </button>
            </div>

            {/* Direcciones */}
            <div className="mb-5">
                <label className="text-sm uppercase font-bold">Dirección</label>
                {contactAddress.map((_, index) => (
                    <div
                        key={index}
                        className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-300"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-grow space-y-3">
                                {/* Calle */}
                                <input
                                    type="text"
                                    placeholder="Calle"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-3"
                                    {...register(`contactAddress.${index}.street`, {
                                        validate: (value) =>
                                            value.trim() !== "" || "La calle es obligatoria",
                                    })}
                                />
                                {errors.contactAddress?.[index]?.street && (
                                    <ErrorMessage>
                                        {errors.contactAddress[index]?.street?.message}
                                    </ErrorMessage>
                                )}

                                {/* Ciudad */}
                                <input
                                    type="text"
                                    placeholder="Ciudad"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-3"
                                    {...register(`contactAddress.${index}.city`, {
                                        validate: (value) =>
                                            value.trim() !== "" || "La ciudad es obligatoria",
                                    })}
                                />
                                {errors.contactAddress?.[index]?.city && (
                                    <ErrorMessage>
                                        {errors.contactAddress[index]?.city?.message}
                                    </ErrorMessage>
                                )}

                                {/* Código Postal */}
                                <input
                                    type="text"
                                    placeholder="Código Postal"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-3"
                                    {...register(`contactAddress.${index}.postalCode`, {
                                        validate: (value) =>
                                            value.trim() !== "" || "El código postal es obligatorio",
                                    })}
                                />
                                {errors.contactAddress?.[index]?.postalCode && (
                                    <ErrorMessage>
                                        {errors.contactAddress[index]?.postalCode?.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => removeAddressField(index)}
                                className="text-gray-400 hover:text-gray-600 ml-4 mt-1"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addAddressField}
                    className="mt-2 w-full flex items-center justify-center text-blue-600 bg-gray-100 hover:bg-blue-100 rounded-md py-2 text-sm font-medium"
                >
                    + Añadir Dirección
                </button>
            </div>

            <div className="p-6 border-t flex justify-end gap-4 bg-white sticky bottom-0">
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm font-medium"
                    type="button"
                    onClick={() => { }}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium"
                >
                    Agregar Contacto
                </button>
            </div>
        </>
    );
}