<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
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
</script>
