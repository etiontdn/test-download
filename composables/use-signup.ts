import { useNuxtApp, useRuntimeConfig, useFetch } from "#imports"

export default async function (email: string, password: string, fullname: string, country: string, phone_code: string, phone: string, customerId: string) {
    const { $supabase } = useNuxtApp()
    const config = useRuntimeConfig()

    const { user, session, error } = await $supabase().auth.signUp(
        {
            email,
            password,
        },

        {
            data: {
                fullname, country, phone_code, phone, customerId
            }
        })

    if (error) {
        return { error }
    }

    return { error: false, user }
}