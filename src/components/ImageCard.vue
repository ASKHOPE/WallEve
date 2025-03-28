<script setup lang="ts">
import { computed } from 'vue';
import type { Photo } from '../types/pexels'; // Assuming types are defined

const props = defineProps<{
  photo: Photo;
  isFallback?: boolean;
}>();

// Use computed properties for cleaner template logic
const photographerUrl = computed(() => props.photo.photographer_url);
const photographerName = computed(() => props.photo.photographer);
const photoUrl = computed(() => props.photo.url); // Link to Pexels page

// Define sources for the <picture> element
const sources = computed(() => [
  { srcset: props.photo.src.large2x, media: '(min-width: 1200px)' },
  { srcset: props.photo.src.large, media: '(min-width: 768px)' },
  { srcset: props.photo.src.medium, media: '(min-width: 576px)' },
]);

// Fallback image source (used if isFallback is true or as default for <img>)
const defaultSrc = computed(() => props.isFallback ? props.photo.src.original : props.photo.src.small);
const altText = computed(() => props.photo.alt || `Photo by ${photographerName.value}`);

</script>

<template>
  <div class="image-card">
    <picture v-if="!isFallback">
      <source
        v-for="(source, index) in sources"
        :key="index"
        :srcset="source.srcset"
        :media="source.media"
      />
      <img :src="defaultSrc" :alt="altText" loading="lazy" />
    </picture>
    <!-- Simplified img for fallback -->
    <img v-else :src="defaultSrc" :alt="altText" loading="lazy" />

    <div class="info" v-if="!isFallback">
      Photo by <a :href="photographerUrl" target="_blank" rel="noopener noreferrer">{{ photographerName }}</a>
      on <a :href="photoUrl" target="_blank" rel="noopener noreferrer">Pexels</a>
    </div>
     <div class="info" v-else>
      Fallback Image (API unavailable)
    </div>
  </div>
</template>

<!-- <style scoped>
/* Styles moved to style.css */
</style> -->
