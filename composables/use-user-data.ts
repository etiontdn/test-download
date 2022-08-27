import { useNuxtApp, useRuntimeConfig, useFetch } from "#imports"

export default async function () {
    const { $supabase } = useNuxtApp()
    const config = useRuntimeConfig()

    const user = $supabase().auth.session()

    if (!user || !user.access_token) {
        return { error: true }
    }

    const { data } = await $supabase().from('profiles').select('*')
    const userData = data[0]

    return { error: false, userData }
}