<script setup lang="ts">
import { ref } from 'vue'

const jwt = ref('')
const createUserToggle = ref(false)
const email = ref('')
const username = ref('')
const password = ref('')

console.log('This is a Vue file!')

if (!import.meta.env.VITE_LAMBDA_URL) {
  console.error('VITE_LAMBDA_URL is not set')
}

function sendRequest() {
  fetch(`${import.meta.env.VITE_LAMBDA_URL}exampleEndpoint`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'foo': 'bar'
    }
  })
    .then(response => response.text())
    .then(data => {
      console.log('Response from server:', data)
    })
}

function testJwt() {
  fetch(`${import.meta.env.VITE_LAMBDA_URL}testJwt`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ jwt: jwt.value }),
  })
    .then(response => response.text())
    .then(data => {
      console.log('Response from server:', data)
    })
}

async function login() {
  jwt.value = await fetch(`${import.meta.env.VITE_LAMBDA_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('JWT from server:', data)
      return data.jwt
    })
}

async function createUser() {
  await fetch(`${import.meta.env.VITE_LAMBDA_URL}createUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username.value, email: email.value, password: password.value }),
  })
    .then(response => response.text())
    .then(data => {
      console.log('Response from server:', data)
    })
}
</script>

<template>
  <h1>Hello, World!</h1>
  <p>This is a bare bones HTML template.</p>
  <button @click="sendRequest()">Click to send request</button>
  <form v-if="!createUserToggle" @submit.prevent="login()">
    <input type="text" placeholder="email" v-model="email" />
    <input type="text" placeholder="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
  <form v-else-if="createUserToggle" @submit.prevent="createUser()">
    <input type="text" placeholder="username" v-model="username" />
    <input type="text" placeholder="email" v-model="email" />
    <input type="text" placeholder="password" v-model="password" />
    <button type="submit">Create User</button>
  </form>
  <button @click="testJwt()">Click to test your JWT</button>
  <button @click="createUserToggle = !createUserToggle">Toggle Create User</button>
</template>

<style lang="css" scoped></style>