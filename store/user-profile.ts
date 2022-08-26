import { defineStore } from 'pinia'
import { ref, computed } from '#imports'


export const useUserStore = defineStore('userProfile', () => {
    const loggedIn = ref(false)
    const name = ref(undefined)
    const email = ref(undefined)
    const fullname = ref(undefined)
    const customerId = ref(undefined)
    const phone = ref(undefined)
    const country = ref(undefined)

    function updateUser(userData) {
        loggedIn.value = true
        name.value = userData.name
        email.value = userData.email
    }

    function getSecondaryData(userData) {
        fullname.value = userData.fullname
        phone.value = userData.phone
        country.value = userData.country
    }

    function setId(id) {
        customerId.value = id
    }

    function logout() {
        loggedIn.value = false
        name.value = undefined
        email.value = undefined
        fullname.value = undefined
        phone.value = undefined
        country.value = undefined
        customerId.value = undefined
    }

    return {
        loggedIn, name, email, updateUser, fullname, customerId, phone, country, getSecondaryData, setId, logout
    }

})
