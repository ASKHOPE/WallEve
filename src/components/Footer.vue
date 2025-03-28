<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <!-- <router-link to="/about">About Us</router-link> -->

    <p>&copy; {{ currentYear }} WallEve. Open License For Personal Use and Non Commercial.</p>
  </footer>
</template>

<!-- <style scoped>
.footer {
  text-align: center;
  padding: 1rem;
  margin-top: 1rem;
  background-color: var(--footer-bg-color);
  color: var(--footer-text-color);
  font-size: 0.9rem;
  border-top: 1px solid var(--image-border-color); /* Use theme variable */
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}
</style> -->
