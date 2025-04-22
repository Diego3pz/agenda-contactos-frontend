import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ContactFormData, dashboardContactSchema } from "../types";

export async function createContact(formData: ContactFormData) {
    try {
        const { data } = await api.post('/contacts', formData)
        return data;


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }

}

export async function getContacts() {
    try {
        const { data } = await api('/contacts')
        const response = dashboardContactSchema.safeParse(data)
        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }

}