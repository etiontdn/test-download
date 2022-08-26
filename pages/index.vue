<script setup>
const { data } = await useAsyncData('content', async () => {
    const data = await queryContent('/main-page-content').findOne()
    return data
})


const { _value: { title, description } } = data;


</script>
<template>
    <main>
        <ContentDoc v-slot="{ doc }">
            <h1>{{ doc.title }}</h1>
        </ContentDoc>
    </main>
</template>