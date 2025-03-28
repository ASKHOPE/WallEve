<script setup lang="ts">
import { watchEffect } from 'vue';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import { useTheme } from './composables/useTheme';

const { theme } = useTheme();

// Apply theme class to HTML element
watchEffect(() => {
  document.documentElement.className = theme.value;
});
</script>

<template>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet">
</head>

  <NavBar />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<style>
/* Ensure App takes full height if needed, body style handles flex */
#app {
  /* Styles moved to style.css */
}
main {
 /* Styles moved to style.css */
}
</style>
