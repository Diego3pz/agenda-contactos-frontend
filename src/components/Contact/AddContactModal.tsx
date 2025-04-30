import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import ContactForm from './ContactForm';
import { ContactFormData } from '../../types';
import { createContact } from '../../api/ContactAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddContactModal() {

    const initialValues: ContactFormData = {
        contactName: "",
        contactEmail: "",
        contactPhones: [""],
        contactAddress: [{ street: "", city: "", postalCode: "" }],
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createContact,
        onSuccess: (data) => {
            // Invalidar la consulta de contactos para actualizar la lista
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            // Resetear el formulario
            reset(initialValues);
            setPhones([""]);
            setAddresses([{ street: "", city: "", postalCode: "" }]);
            
            toast.success(data);

            navigate('', { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalContact = queryParams.get('newContact');
    const show = modalContact ? true : false;


    const [phones, setPhones] = useState(['']);
    const [addresses, setAddresses] = useState([{ street: '', city: '', postalCode: '' }]);

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
        try {
            mutation.mutate(formData); // Llama a la mutación para crear el contacto

        } catch (error) {
            toast.error("Error al crear el contacto");
        }
    };

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={() => navigate('', { replace: true })}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                {/* Header */}
                                <div className="p-6 bg-blue-600 text-white rounded-t-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <UserPlusIcon className="h-8 w-8" />
                                        <Dialog.Title as="h3" className="text-xl font-bold">
                                            Crear Nuevo Contacto
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
                                    <ContactForm
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}