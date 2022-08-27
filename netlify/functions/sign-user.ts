import { Handler } from "@netlify/functions";
import { $fetch } from 'ohmyfetch'

const handler: Handler = async (event, context) => {
    async function getDataFromAuth0(token) {
        const data = await $fetch("https://dev-dq57g8fd.us.auth0.com/userinfo", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
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
        return data
    }


    async function getDataFromCommerceJS(email) {
        const data = await $fetch("https://api.chec.io/v1/customers", {
            method: "GET",
            params: { query: email },
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
        return data
    }

    function isSignedUp(commerceData, auth0Data) {
        if (commerceData.meta.pagination.total < 1) {
            return { is: false, match: null }
        }

        for (const item of commerceData.data) {
            if (item.email === auth0Data.email) {
                if (item.external_id === auth0Data.sub) {
                    return { is: true, match: item }
                    break
                }
            }
        }

        return { is: false, match: null }

    }

    async function signUp(auth0Data) {
        const { email, sub: external_id } = auth0Data

        const customerData = await $fetch("https://api.chec.io/v1/customers/", {
            method: "POST",
            body: {
                email: email, external_id: external_id
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

    async function updateUser(userData, match) {
        const id = match.id

        const customerData = await $fetch("https://api.chec.io/v1/customers/" + id, {
            method: "PUT",
            body: {
                phone: userData.phone,
                firstname: userData.fullname,
                meta: {
                    country: userData.country
                }
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

    if (event.httpMethod === "POST") {
        if (!event.body) {
            return {
                statusCode: 404
            }
        }
        const body = JSON.parse(event.body)
        if (!body.token) {
            return {
                statusCode: 404
            }
        }
        const token = body.token

        const auth0Data = await getDataFromAuth0(token)

        const commerceData = await getDataFromCommerceJS(auth0Data.email)


        const { is: isSigned, match } = isSignedUp(commerceData, auth0Data)

        if (isSigned) {
            if (body.updateUser) {
                const data = await updateUser(body.updateUser, match)
                console.log(data)
                if (data !== null) {
                    return {
                        statusCode: 200,
                        body: JSON.stringify(data)
                    }
                } else {
                    return {
                        statusCode: 500,
                        body: JSON.stringify(
                            {
                                error: "error updating user"
                            }
                        )
                    }
                }
            }

            return {
                statusCode: 200,
                body: JSON.stringify(match)
            }
        } else {
            const recentSignUp = await signUp(auth0Data)
            if (recentSignUp === null) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        error: "email is not unique"
                    })
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(recentSignUp)
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: auth0Data
            })
        }
    }

    return {
        statusCode: 404,
    }
};

export { handler };
