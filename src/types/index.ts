import { z } from 'zod'

// Contacts
export const contactSchema = z.object({
    _id: z.string(),
    contactName: z.string(),
    contactEmail: z.string(),
    contactPhones: z.array(z.string()),
    contactAddress: z.array(
        z.object({
            street: z.string(),
            city: z.string(),
            postalCode: z.string(),
        })
    ),
})

export type Contact = z.infer<typeof contactSchema>
export type ContactFormData= Pick<Contact, 'contactName' | 'contactEmail' | 'contactPhones' | 'contactAddress'>