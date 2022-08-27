<script setup lang="ts">
import { useNuxtApp, ref, useRuntimeConfig, useFetch } from '#imports';

// const config = useRuntimeConfig()
// let universalLogin = "https://dev-dq57g8fd.us.auth0.com/authorize?response_type=token&client_id=" + config.public.client_id + "&redirect_uri=http://localhost:8888/&scope=openid%20profile%20email"

const count = ref(0)

async function signup() {
    const { $supabase } = useNuxtApp()

    if ($supabase().auth.user()) {
        console.log("already logged in")
        return
    }

    const { email, password, fullname, country, phone_code, phone } = formData.value

    const config = useRuntimeConfig()

    const commerceSignup = await useFetch("/.netlify/functions/user", {
        baseURL: config.public.netlify_baseurl,
        method: "POST",
        body: {
            email
        },

        key: "signup" + String(++count.value),

        transform: function (data: any) {
            return { id: data.id }
        }
    })

    if (commerceSignup.error.value) {
        alert("Ocorreu algum erro no cadastro")
        return false
    }

    const { id } = commerceSignup.data.value

    const { user, session, error } = await $supabase().auth.signUp(
        {
            email,
            password,
        },

        {
            data: {
                fullname, country, phone_code, phone, customerId: id
            }
        })

    if (error) {
        alert("Ocorreu algum erro no cadastro")
        const commerceSignup = await useFetch("/.netlify/functions/user", {
            baseURL: config.public.netlify_baseurl,
            method: "DELETE",
            key: "delete" + String(++count.value),
            body: {
                id
            },
        })
        return false
    }


    alert("cadastrado com sucesso")
    return true
}


const formData = ref(
    {
        fullname: "",
        country: "BR",
        phone: "",
        phone_code: "+55",
        email: "",
        password: "",
        confirmPassword: "",
    }
)

</script>
<template>
    <main class="p-2 m-2">
        <form @submit.prevent="signup()" class="flex flex-col gap-2 bg-slate-200 w-64 p-4">
            <input v-model="formData.fullname" type="text" name="fullname" id="fullname">
            <select v-model="formData.country" type="text" name="country" id="country">
                <option value="BR">Brasil</option>
                <option value="FR">França</option>
            </select>
            <input v-model="formData.phone_code" type="text" name="phone_code" id="phone_code">
            <input v-model="formData.phone" type="text" name="phone" id="phone">
            <input v-model="formData.email" type="email" name="email" id="email">
            <input v-model="formData.password" type="password" name="password" id="password">
            <input v-model="formData.confirmPassword" type="password" name="confirmPassword" id="confirmPassword">
            <input type="submit" value="Signup">
        </form>
    </main>
</template>