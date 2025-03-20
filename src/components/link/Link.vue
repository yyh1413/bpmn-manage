<template>
  <div class="flex items-center cursor-pointer" @mouseenter="show = true" @mouseleave="show = false">
    <span class="text-[#155cb5] mr-2">
      {{ text }}
    </span>
    <Copy v-show="show" :text="text" />
  </div>
</template>

<script setup>
import Copy from './Copy.vue'
const show = ref(false)
defineProps(['text'])

</script>
