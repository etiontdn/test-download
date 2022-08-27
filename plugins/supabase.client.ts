import { defineNuxtPlugin, useRuntimeConfig } from "#imports"

import { createClient } from '@supabase/supabase-js'



export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig()

    const { supabaseUrl, supabaseAnon } = config.public
    const supabase = createClient(supabaseUrl, supabaseAnon)

    return {
        provide: {
            supabase: () => supabase
        }
    }
})
