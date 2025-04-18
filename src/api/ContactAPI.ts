import api from "../lib/axios";
import { ContactFormData } from "../types";

export async function createContact(formData: ContactFormData) {
    try {
        const { data } = await api.post('/contacts', formData)
        console.log(data);


    } catch (error) {
        console.error("Error al crear el contacto:", error);

    }

}