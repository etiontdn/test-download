<script setup>
const config = useRuntimeConfig()
let universalLogin = "https://dev-dq57g8fd.us.auth0.com/authorize?response_type=token&client_id=" + config.public.client_id + "&redirect_uri=http://localhost:8888/&scope=openid%20profile%20email"

function signup() {
    console.log(signup)
}


const formData = ref(
    {
        fullname: "",
        country: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
)

</script>
<template>
    <main class="p-2 m-2">
        <form @action.prevent="signup()" class="flex flex-col gap-2 bg-slate-200 w-64 p-4">
            <input v-model="formData.fullname" type="text" name="fullname" id="fullname">
            <select v-model="formData.country" type="text" name="country" id="country">
                <option value="BR">Brasil</option>
                <option value="FR">França</option>
            </select>
            <input v-model="formData.phone" type="text" name="phone" id="phone">
            <input v-model="formData.email" type="email" name="email" id="email">
            <input v-model="formData.password" type="password" name="password" id="password">
            <input v-model="formData.confirmPassword" type="password" name="confirmPassword" id="confirmPassword">
        </form>
    </main>
</template>