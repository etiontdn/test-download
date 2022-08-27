<script setup>
import { useUserStore } from '~~/store/user-profile';
import { useNuxtApp, ref, useRuntimeConfig, useFetch } from '#imports';

async function logout() {
    const { $supabase } = useNuxtApp()
    const { error } = await $supabase().auth.signOut()
}
</script>
<template>
    <main class="p-2 m-2">
        <a class="bg-green-500 test-white px-4 py-2 rounded-2 m-2" @click="logout">Logout</a>
    </main>
</template>