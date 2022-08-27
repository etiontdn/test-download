import { useNuxtApp, useRuntimeConfig, useFetch } from "#imports"

export default async function (email: string) {
    const { $supabase } = useNuxtApp()
    const config = useRuntimeConfig()

    const commerceSignup = await useFetch("/.netlify/functions/user", {
        baseURL: config.public.netlify_baseurl,
        method: "POST",
        body: {
            email
        },

        key: "signup" + String(Math.random() * 1000),

        transform: function (data: any) {
            return { id: data.id }
        }
    })

    if (commerceSignup.error.value) {
        const errorMsg = "Ocorreu algum erro no cadastro"
        return { error: errorMsg }
    }

    return { error: false, id: commerceSignup.data.value.id }
}