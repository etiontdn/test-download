<script setup>
const config = useRuntimeConfig()
let universalLogin = "https://dev-dq57g8fd.us.auth0.com/authorize?response_type=token&client_id=" + config.public.client_id + "&redirect_uri=http://localhost:8888/&scope=openid%20profile%20email"



    // const { data } = await useFetch('https://dev-dq57g8fd.us.auth0.com/authorize', {
    //     method: 'GET',
    //     params: {
    //         response_type: 'token',
    //         client_id: config.public.client_id,
    //         redirect_uri: 'http://localhost:3000/'
    //     },
    // })


</script>
<template>
    <main class="p-2 m-2">
        <a :href="universalLogin" class="bg-green-500 test-white px-4 py-2 rounded-2 m-2" @click="login">Login</a>
    </main>
</template>