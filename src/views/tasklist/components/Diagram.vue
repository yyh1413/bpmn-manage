<template>
  <div v-if="initData" class="chart">
    <FlowChart :bpmnStr="initData" :taskDefId="taskDefId" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import http from '@/utils/http'
import FlowChart from '@/components/flowChart/FlowChart.vue'


const props = defineProps({
  taskId: {
    type: String,
    default: () => ''
  },
  taskDefId: {
    type: String,
    default: () => ''
  }
})

const initData = ref()
watch(() => props.taskId, (newVal) => {
  initData.value = null
  fetchData()
}, { immediate: true })

function fetchData() {
  const param = {
    taskId: props.taskId,
  }
  http.post('/pes/taskList/queryTaskDiagram', param).then(res => {
    initData.value = res.data.bpmnStr

  })
}
</script>

<style lang='scss' scoped>
.chart {
  height: calc(100vh - 300px);
}
</style>