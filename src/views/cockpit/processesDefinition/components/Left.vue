<template>
  <div class="w-[20%] h-full " style="border-right: 1px solid #ddd;">
    <div v-for="(item, index) in leftData" :key="item.name" class="mb-3" @mouseenter="mouseenter(index)" @mouseleave="mouseenter()">
      <div class="font-bold flex">
        <span class="mr-2"> {{ item.name }}:</span>
        <div v-if="item.copy">
          <Copy :text="item.value" v-show="copyFlag === index" />
        </div>
      </div>
      <div v-if="item.name === '定义版本'">
        <el-select v-model="version" style="width: 60px;" @change="handleVersionChange">
          <el-option v-for="item in processInfo.versionList" :key="item.procDefId" :label="item.version" :value="item.procDefId" />
        </el-select>
      </div>
      <div class="ml-2 els" v-else-if="!Array.isArray(item.value)" :style="{ color: item.url ? '#155cb5' : '' }">
        {{ item.value }}
      </div>
      <div class="ml-2" v-else>
        <ul>
          <li v-for="subItem in item.value" :key="subItem.name" class="flex">
            <div class="mr-1">• </div>
            <div>
              {{ subItem.name }}:
            </div>
            <div class="ml-2 font-bold">
              {{ subItem.value }}
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script setup>
import Copy from '@/components/link/Copy.vue'
const version = ref()
const props = defineProps({
  processInfo: {
    type: Object,
    default: () => ({})
  },
  leftData: {
    type: Array,
    default: () => []
  }
})
onMounted(() => {
  version.value = props.processInfo.procDefId
})
const copyFlag = ref()
function mouseenter(index) {
  copyFlag.value = index
}
const emit = defineEmits(['changeVersion'])

function handleVersionChange() {
  emit('changeVersion', version.value)
}
</script>
