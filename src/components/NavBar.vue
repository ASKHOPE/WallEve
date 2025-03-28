<script setup lang="ts">
import { useTheme } from '../composables/useTheme';

const { theme, toggleTheme } = useTheme();

const getButtonText = () => {
  return theme.value === 'light' ? 'Switch to Dark' : 'Switch to Light';
};
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <router-link to="/" class="site-title">Wall Eve</router-link>

      <div class="nav-links">
        <router-link to="/about">About Us</router-link>
        <button @click="toggleTheme" class="theme-toggle">{{ getButtonText() }}</button>
      </div>
    </nav>
  </header>
</template>

<!-- <style scoped>

</style> -->
