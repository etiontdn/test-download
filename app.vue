<template>
  <div v-loaded>
    <NuxtPage />
  </div>
</template>

<script setup>
import { setCookie } from 'h3';
import { useUserStore } from '~/store/user-profile.ts'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Site Title` : 'Site Title';
  },
  meta: [
    { name: "description", content: "Descrição padrão" },
    { name: "keywords", content: "1, 2, 3" },
    { name: "author", content: "Autor Teste" }
  ]
})

const route = useRoute()

const { $supabase } = useNuxtApp()

const vLoaded = {
  mounted: async (el) => {
    console.log($supabase().auth.session())
    // if (route.hash.includes("access_token")) {
    // }
  }
}




</script>
