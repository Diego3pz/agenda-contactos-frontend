import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Contact, ContactFormData, dashboardContactSchema } from "../types";

type ContactAPI = {
    formData: ContactFormData
    ContactId: Contact['_id']
}

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

export async function getContactById(id: Contact['_id']) {
    try {
        const { data } = await api(`/contacts/${id}`)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }
}

export async function updateContact({ ContactId, formData }: Pick<ContactAPI, 'ContactId' | 'formData'>) {
    try {
        const { data } = await api.put<string>(`/contacts/${ContactId}`, formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }

}

export async function deleteContactById(id: Contact['_id']) {
    try {
        const { data } = await api.delete<string>(`/contacts/${id}`)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }
}