import { useNuxtApp, useRuntimeConfig, useFetch } from "#imports"

export default async function (id: string) {
    const config = useRuntimeConfig()

    const deleteUser = await useFetch("/.netlify/functions/user", {
        baseURL: config.public.netlify_baseurl,
        method: "DELETE",
        key: "delete" + String(Math.random() * 1000),
        body: {
            id
        },
    })

    if (deleteUser.error.value) {
        return { error: deleteUser.error }
    }

    return { error: false }
}