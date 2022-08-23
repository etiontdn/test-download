import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxt/content'],

    content: {    // https://content.nuxtjs.org/api/configuration  
    },

    css: [
        "~/assets/main.css"
    ],

    head: {
        script: [
            { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" }
        ],
    },



    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        }
    },

})
