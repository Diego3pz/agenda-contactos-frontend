import { z } from 'zod'

// Auth & User
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'confirmPassword'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'confirmPassword'>
export type ConfirmToken= Pick<Auth, 'token'>

// User
export const userSchema = authSchema.pick({
    name:true,
    email:true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>


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

export const dashboardContactSchema = z.array(
    contactSchema.pick({
        _id: true,
        contactName: true,
        contactEmail: true,
        contactPhones: true,
        contactAddress: true,
    })
)

export type Contact = z.infer<typeof contactSchema>
export type ContactFormData = Pick<Contact, 'contactName' | 'contactEmail' | 'contactPhones' | 'contactAddress'>