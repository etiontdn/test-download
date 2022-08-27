import { useNuxtApp, useRuntimeConfig, useFetch } from "#imports"

export default async function () {
    const { $supabase } = useNuxtApp()
    const config = useRuntimeConfig()

    const accessToken = $supabase().auth.session().access_token

    const commerceLogin = await useFetch("/.netlify/functions/user", {
        baseURL: config.public.netlify_baseurl,
        headers: {
            "X-Supabase-Auth": accessToken
        },
        method: "GET",
        key: "login" + String(Math.random() * 1000),

        transform: function (data: { jwt: string }) {
            return {
                jwt: data.jwt
            }
        }
    })

    const { jwt } = commerceLogin.data.value

    if (commerceLogin.error.value) {
        return { error: commerceLogin.error.value }
    }

    return { error: false, jwt }
}