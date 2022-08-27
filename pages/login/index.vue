<script setup lang="ts">
import { useLogin, ref, useLoginCommerce, useUserData } from '#imports';

async function login() {
    const data = formData.value
    const loginResponse = await useLogin(data)

    console.log(loginResponse)

    if (loginResponse.error) {
        if (loginResponse.error.message === "Email not confirmed") {
            alert("Email não confirmado")
        }
        else if (loginResponse.error.message === "Invalid login credentials") {
            alert("Credenciais inválidas")
        }
    }

    const acessData = await useLoginCommerce()

    console.log(await useUserData())
}

const formData = ref(
    {
        email: "",
        password: "",
    }
)

</script>
<template>
    <main class="p-2 m-2">
        <form @submit.prevent="login()" class="flex flex-col gap-2 bg-slate-200 w-64 p-4">
            <input v-model="formData.email" type="email" name="email" id="email">
            <input v-model="formData.password" type="password" name="password" id="password">
            <input type="submit" value="login">
        </form>
    </main>
</template>