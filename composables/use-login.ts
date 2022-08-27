import { useNuxtApp, useRuntimeConfig, useFetch } from "#imports"

export default async function (loginData: { email: string, password: string }) {
    const { $supabase } = useNuxtApp()

    const { email, password } = loginData

    const { user, session, error } = await $supabase().auth.signIn(
        {
            email,
            password,
        })

    if (error) {
        return { error }
    }

    return { error: false, user, session }
}