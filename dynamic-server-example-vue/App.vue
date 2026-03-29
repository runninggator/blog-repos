<script setup lang="ts">
import { ref } from 'vue'

const jwt = ref('')
const username = ref('')
const password = ref('')

console.log('This is a Vue file!')

function sendRequest() {
  fetch('https://www.jimmy-localhost.com:3000/exampleEndpoint', {
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
  fetch('https://www.jimmy-localhost.com:3000/testJwt', {
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
  jwt.value = await fetch('https://www.jimmy-localhost.com:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username.value, password: password.value }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('JWT from server:', data)
      return data.jwt
    })
}
</script>

<template>
  <h1>Hello, World!</h1>
  <p>This is a bare bones HTML template.</p>
  <button @click="sendRequest()">Click to send request</button>
  <form id="loginForm" @submit.prevent="login()">
    <input type="text" placeholder="username" v-model="username" />
    <input type="text" placeholder="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
  <button @click="testJwt()">Click to test your JWT</button>
</template>

<style lang="css" scoped></style>