<template>
  <div class="flex-1 h-full flex">
    <div class="flex-1">
      <div class=" flex-1 h-[70%]">
        <FlowChart :bpmnStr="bpmnStr" v-if="bpmnStr" :activityStatsList="processInfo.activityStatsList" />
      </div>
      <div class="flex-1 h-[30%] px-2">
        <InstanceList :processInfo="processInfo" />
      </div>
    </div>
    <div class="h-full w-[50px] pl-2" style="border-left: 1px solid #ddd;">
      <el-space :size="20" direction="vertical">
        <el-button :icon="Promotion" @click="$router.push('/process')" />
        <el-button :icon="Tools" />
      </el-space>
    </div>
  </div>
</template>

<script setup>
import { Tools, Promotion } from '@element-plus/icons-vue'

import FlowChart from '@/components/flowChart/FlowChart.vue'
import InstanceList from './InstanceList.vue'
const props = defineProps({
  bpmnStr: {
    type: String,
    default: ''
  },
  processInfo: {
    type: Object,
    default: () => ({})
  }
})
</script>
