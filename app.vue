<template>
  <div v-loaded>
    <NuxtPage />
  </div>
</template>

<script setup>
import { setCookie } from 'h3';
import { useUserStore } from '~/store/user-profile.ts'

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

const route = useRoute()

async function getUserData(token) {
  const { data: { value: { name, email } } } = await useFetch('https://dev-dq57g8fd.us.auth0.com/userinfo', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    transform: (data) => {
      const { name, email } = data
      return { name, email }
    }
  })

  const userStore = useUserStore()
  userStore.updateUser({ name, email })
}

function isTokenSet() {
  const lgin = useCookie('lgin')
  return lgin.value !== undefined
}

async function saveToken() {
  const lgin = useCookie('lgin', { maxAge: 7200 })
  lgin.value = route.hash.match(/=([^&]*)&/)[1]
  await getUserData(lgin.value)
  navigateTo('/')
}

async function signUserCommerce() {
  const config = useRuntimeConfig()

  const lgin = useCookie('lgin')

  const { data: { value: { firstname: fullname, id, meta, phone } } } = await useFetch("/.netlify/functions/sign-user", {
    method: "POST",
    body: {
      token: lgin.value
    },
    baseURL: config.public.netlify_baseurl
  })

  const userStore = useUserStore()
  userStore.setId(id)

  if (fullname === null || meta.country === undefined || phone === null) {
    await finishSignup(lgin.value)
  }

  else {
    setOtherData({ fullname, id, country: meta.country, phone })
  }
}

async function setOtherData(data) {
  const userStore = useUserStore()
  userStore.getSecondaryData(data)
}

async function finishSignup(token) {
  const config = useRuntimeConfig()
  const fullname = prompt("fullname")
  const country = prompt("country")
  const phone = prompt("phone")

  const data = await useFetch("/.netlify/functions/sign-user", {
    method: "POST",
    body: {
      token: token,
      updateUser: {
        fullname, country, phone
      }
    },
    baseURL: config.public.netlify_baseurl
  })

  const val = data.data.value
  setOtherData({ fullname: val.firstname, id: val.id, country: val.meta.country, phone: val.phone })

}


const vLoaded = {
  mounted: async (el) => {
    if (route.hash.includes("access_token")) {
      await saveToken()
      await signUserCommerce()
    } else if (isTokenSet()) {
      const lgin = useCookie('lgin')
      await getUserData(lgin.value)
      await signUserCommerce()
    }


  }
}




</script>
