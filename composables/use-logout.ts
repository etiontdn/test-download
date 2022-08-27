import { useNuxtApp, useRuntimeConfig, useFetch } from "#imports"

export default async function (loginData: { email: string, password: string }) {
    const { $supabase } = useNuxtApp()

    const { error } = $supabase().auth.signOut()

    if (error) {
        return { error }
    }

    return { error: false }
}