<script setup lang="ts">
import { useNuxtApp, ref, useRuntimeConfig, useFetch, useSignup, useSignupCommerce, useUserData, useUserDelete } from '#imports';

async function signup() {
    const { $supabase } = useNuxtApp()

    const userData = await useUserData()

    if (!userData.error) {
        alert("already logged in")

    }

    const { email, password, fullname, country, phone_code, phone } = formData.value

    const config = useRuntimeConfig()

    const commerceSignup = await useSignupCommerce(email)

    if (commerceSignup.error) {
        alert(commerceSignup.error)
        return false
    }

    const id = commerceSignup.id

    const { user, error } = await useSignup(email, password, fullname, country, phone_code, phone, id)

    if (error) {
        alert("Ocorreu algum erro no cadastro")
        const deleteUser = useUserDelete(id)
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