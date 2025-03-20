<template>
  <div class="flex h-full items-center">
    <div v-for="item in menu" :key="item.path" class="mr-2 text-[#545454] cursor-pointer flex items-center h-full px-2"
      @click="goPage(item)" :style="{ 'background-color': path === item.path ? '#eee' : '' }">
      {{ item.meta.title }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import { routes } from '@/router'
const menu = ref([])
const props = defineProps({
  mainType: String,
  path: String,
})

watch(
  () => props.mainType,
  () => {
    menu.value = []
    getMenuList()
  },
  { immediate: true }
)
function getMenuList() {
  routes[0].children.forEach(item => {
    if (item.path.includes(props.mainType) && item.meta && item.meta.menu) {
      menu.value.push(item)
    }
  })
  // console.log(menu.value);
}

function goPage(item) {
  router.push(item.path)
}
</script>