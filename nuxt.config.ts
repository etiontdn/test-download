import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            client_id: process.env.CLIENT_ID,
            domain: process.env.DOMAIN,
            netlify_baseurl: process.env.NETLIFY_FUNC_BASEURL,
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnon: process.env.SUPABASE_ANON
        }
    },


    modules: ['@nuxt/content', ['@pinia/nuxt', {
        autoImports: [
            'defineStore',
        ],
    },]],

    content: {    // https://content.nuxtjs.org/api/configuration  
    },

    css: [
        "~/assets/main.css"
    ],
    // app: {
    //     head: {
    //         script: [
    //             { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" }
    //         ],
    //     }
    // },


    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        }
    },

})
