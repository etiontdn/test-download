import { defineStore } from 'pinia'
import { ref, computed } from '#imports'


export const useUserProfile = defineStore('userProfile', () => {
    const loggedIn = ref(false)
    const email = ref(undefined)
    const fullname = ref(undefined)
    const customerId = ref(undefined)
    const phone = ref(undefined)
    const phone_code = ref(undefined)
    const country = ref(undefined)

    function startFromSession(session_data: { email: string, fullname: string, customerId: string, phone: string, phone_code: string, country: string }) {
        loggedIn.value = true
        email.value = session_data.email
        fullname.value = session_data.fullname
        customerId.value = session_data.customerId
        phone.value = session_data.phone
        phone_code.value = session_data.phone_code
        country.value = session_data.country
    }

    function clearStore() {
        loggedIn.value = false
        email.value = undefined
        fullname.value = undefined
        customerId.value = undefined
        phone.value = undefined
        phone_code.value = undefined
        country.value = undefined
    }



    return {
        loggedIn, email, fullname, customerId, phone, country, startFromSession, clearStore
    }

})
