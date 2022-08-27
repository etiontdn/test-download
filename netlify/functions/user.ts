import { Handler } from "@netlify/functions";
import { $fetch } from 'ohmyfetch'

import { createClient } from '@supabase/supabase-js'




const handler: Handler = async (event, context) => {
    const { SUPABASE_URL: supabaseUrl, SUPABASE_ANON: supabaseAnon } = process.env
    const supabase = createClient(supabaseUrl, supabaseAnon)

    if (event.httpMethod === "POST") {
        if (!event.body) {
            return {
                statusCode: 404
            }
        }
        const body = JSON.parse(event.body)
        if (!body.email) {
            return {
                statusCode: 404
            }
        }

        const signUpData = await signUpCommerceJS(body);

        if (signUpData !== null) {
            return {
                statusCode: 200,
                body: JSON.stringify(signUpData)
            }
        }

    }

    if (event.httpMethod === "DELETE") {
        if (!event.body) {
            return {
                statusCode: 404
            }
        }
        const body = JSON.parse(event.body)
        if (!body.id) {
            return {
                statusCode: 404
            }
        }

        const deletedData = await deleteUserCommerceJS(body.id)

        return {
            statusCode: 200,
            body: JSON.stringify(deletedData)
        }
    }


    if (event.httpMethod === "GET") {
        if (!event.headers) {
            return {
                statusCode: 404
            }
        }
        const headers = event.headers

        if (!headers['x-supabase-auth']) {
            return {
                statusCode: 404
            }
        }

        const commerceSignin = await loginCommerceJS(headers['x-supabase-auth'])


        return {
            statusCode: 200,
            body: JSON.stringify(commerceSignin)
        }
    }


    async function signUpCommerceJS(data: { email: string, }) {
        const { email } = data

        const customerData = await $fetch("https://api.chec.io/v1/customers/", {
            method: "POST",
            body: {
                email: email
            },
            headers: {
                'X-Authorization': process.env.COMMERCEJS_SK,
                'Content-Type': 'application/json'
            },

            parseResponse: JSON.parse,

            async onRequestError({ request, options, error }) {
                console.log(error)
                return null
            },
            async onResponseError({ request, options, error }) {
                console.log(error)
                return null
            }
        })

        return customerData
    }

    async function deleteUserCommerceJS(customerId: string) {
        const customerData = await $fetch("https://api.chec.io/v1/customers/" + customerId, {
            method: "DELETE",
            headers: {
                'X-Authorization': process.env.COMMERCEJS_SK,
                'Content-Type': 'application/json'
            },
        })

        return customerData
    }

    async function loginCommerceJS(supabaseToken: string) {
        const user = supabase.auth.setAuth(supabaseToken)

        const { data } = await supabase.from('profiles').select('customerId')
        const id = data[0].customerId

        const loginCostumer = await $fetch("https://api.chec.io/v1/customers/" + id + "/issue-token", {
            method: "POST",
            headers: {
                'X-Authorization': process.env.COMMERCEJS_SK,
                'Content-Type': 'application/json'
            },
            parseResponse: JSON.parse,
            async onRequestError({ request, options, error }) {
                console.log(error)
                return null
            },
            async onResponseError({ request, options, error }) {
                console.log(error)
                return null
            }
        })

        return loginCostumer
    }

    return {
        statusCode: 404,
    }
};

export { handler };