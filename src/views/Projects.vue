<template>
  <div class="relative w-full h-full overflow-hidden">
    <!-- Scrollable Content -->
    <div class="relative z-10 flex overflow-x-auto scroll-smooth snap-x snap-mandatory">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-full h-full object-cover flex-shrink-0 snap-start"
      >
        <img class="w-full object-cover" :src="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const images = [
  new URL('../assets/images/hoomans.png', import.meta.url).href,
  new URL('../assets/images/lyst.png', import.meta.url).href,
  new URL('../assets/images/baystreet.png', import.meta.url).href,
  new URL('../assets/images/lagom.png', import.meta.url).href
]

onMounted(() => {
  
})
</script>

<style scoped>
/* Optional scroll bar hiding */
::-webkit-scrollbar {
  display: none;
}
</style>
