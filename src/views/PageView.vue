<script setup lang="ts">
import { usePexels } from '../composables/usePexels';
// @import "tailwindcss";

const props = defineProps<{ pageTitle: string; query: string }>();

// Use Pexels composable with pagination
const { 
  photos, 
  isLoading, 
  error, 
  currentPage, 
  nextPage, 
  prevPage, 
  nextPageUrl, 
  prevPageUrl 
} = usePexels(props.query, 9);
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">{{ pageTitle }}</h2>

    <p v-if="isLoading">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">



      <div v-for="image in photos" :key="image.id" class="rounded overflow-hidden shadow">
        <picture>
          <!-- Load portrait images for mobile (width < 768px) -->
          <source :srcset="image.src.portrait" media="(max-width: 767px)" />
          
          <!-- Load landscape images for desktop (width >= 768px) -->
          <source :srcset="image.src.landscape" media="(min-width: 768px)" />
          
          <!-- Fallback image -->
          <img :src="image.src.medium" :alt="image.alt" class="fallback-image" />
        </picture>
        <p class="text-sm text-center mt-2">📷 {{ image.photographer }}</p>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-between mt-6">
      <button @click="prevPage" :disabled="!prevPageUrl" class="px-4 py-2 bg-gray-300 disabled:opacity-50">
        Previous
      </button>

      <span>Page {{ currentPage }}</span>

      <button @click="nextPage" :disabled="!nextPageUrl" class="px-4 py-2 bg-gray-300 disabled:opacity-50">
        Next
      </button>
    </div>
  </div>
</template>
