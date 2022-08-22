import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxt/content'],
    content: {    // https://content.nuxtjs.org/api/configuration  
    },

    css: [
        "~/assets/main.css"
    ],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        }
    },

})
