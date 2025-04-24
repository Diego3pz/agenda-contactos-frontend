import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { Contact, ContactFormData } from '../../types';
import { updateContact } from '../../api/ContactAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EditContactForm from './EditContactForm';

type EditContactModalProps = {
    data: ContactFormData
    contactId: Contact['_id']
}

export default function EditContactModal({ data, contactId }: EditContactModalProps) {
    const navigate = useNavigate();

    // Inicializar los estados con los datos existentes
    const [phones, setPhones] = useState<string[]>(data.contactPhones || ['']);
    const [addresses, setAddresses] = useState<{ street: string; city: string; postalCode: string }[]>(
        data.contactAddress || [{ street: '', city: '', postalCode: '' }]
    );

    const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
        defaultValues: {
            contactName: data.contactName,
            contactEmail: data.contactEmail,
            contactPhones: data.contactPhones,
            contactAddress: data.contactAddress,
        },
    });


    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateContact,
        onSuccess: (data) => {
            // Invalidar la consulta de contactos para actualizar la lista
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            queryClient.invalidateQueries({ queryKey: ["editContact", contactId] });
            toast.success(data);
            navigate(location.pathname, { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const addPhoneField = () => setPhones([...phones, '']);
    const removePhoneField = (index: number) => {
        if (phones.length > 1) {
            setPhones(phones.filter((_, i) => i !== index));
        }
    };

    const addAddressField = () => setAddresses([...addresses, { street: '', city: '', postalCode: '' }]);
    const removeAddressField = (index: number) => {
        if (addresses.length > 1) {
            setAddresses(addresses.filter((_, i) => i !== index));
        }
    };

    const handleForm = (formData: ContactFormData) => {
        const data = {
            formData,
            ContactId: contactId
        }
        mutate(data)
    };

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={() => navigate(location.pathname, { replace: true })}>
                <div className="fixed inset-0 bg-black/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                            {/* Header */}
                            <div className="p-6 bg-green-600 text-white rounded-t-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <UserPlusIcon className="h-8 w-8" />
                                    <Dialog.Title as="h3" className="text-xl font-bold">
                                        Editar Contacto
                                    </Dialog.Title>
                                </div>
                                <button
                                    className="text-white hover:text-gray-200"
                                    onClick={() => navigate('', { replace: true })}
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Formulario */}
                            <form
                                className="px-6 pt-6 space-y-4 max-h-[60vh] overflow-y-auto"
                                onSubmit={handleSubmit(handleForm)}
                                noValidate
                            >
                                <EditContactForm
                                    register={register}
                                    errors={errors}
                                    contactPhones={phones}
                                    contactAddress={addresses}
                                    addPhoneField={addPhoneField}
                                    removePhoneField={removePhoneField}
                                    addAddressField={addAddressField}
                                    removeAddressField={removeAddressField}
                                />
                            </form>

                            {/* Footer */}
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}