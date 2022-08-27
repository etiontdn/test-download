<script setup>
import { useUserStore } from '~~/store/user-profile';
import { useLogout } from '#imports';

async function logout() {
    const { error } = useLogout()
}
</script>
<template>
    <main class="p-2 m-2">
        <a class="bg-green-500 test-white px-4 py-2 rounded-2 m-2" @click="logout">Logout</a>
    </main>
</template>