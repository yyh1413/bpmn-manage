<template>

  <h1 v-if="!taskInfo" class="well"> 在列表中选择一个资源
  </h1>
  <div v-else>
    <div class="text-[30px] mb-3 text-[#000]">{{ taskInfo.taskName }}</div>
    <div class="text-[18px] mb-3 text-[#000]">{{ taskInfo.procDefName }}</div>

    <SetParam :taskInfo="taskInfo" :setClaim="setClaim" @fetchTaskDetail="fetchData" />
    <el-tabs v-model="tabName" class="demo-tabs" @tab-click="handleTabsClick">
      <el-tab-pane label="表单" name="form">
        <Form :taskId="taskId" @fetchTaskAll="fetchTaskAll" ref="formRef" />
      </el-tab-pane>
      <el-tab-pane label="历史" name="history">
        <History :taskId="taskId" />
      </el-tab-pane>
      <el-tab-pane label="流程图" name="diagram">
        <Diagram :taskId="taskId" v-if="tabName === 'diagram'" :taskDefId="taskInfo.taskDefId" />
      </el-tab-pane>
      <el-tab-pane label="备注" name="description">
        <div class="well">
          {{ taskInfo.description || '暂无备注' }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import http from '@/utils/http'
import History from './History.vue'
import Form from './Form.vue'
import Diagram from './Diagram.vue'
import SetParam from './SetParam.vue'
const tabName = ref('form')
const taskInfo = ref()
const formRef = ref()
const emit = defineEmits(['fetchTaskAll'])
const props = defineProps({
  taskId: {
    type: String,
    default: ''
  },
  setClaim: {
    type: Function,
    default: () => { }
  }
})
watch(() => props.taskId, (newVal) => {
  fetchData()
})

const handleTabsClick = (tab, event) => {
  // console.log(tab, event)
}

const fetchTaskAll = () => {
  emit('fetchTaskAll')
  taskInfo.value = null
}
const fetchData = (refreshFrom) => {
  const param = {
    taskId: props.taskId,
  }
  http.post('/pes/taskList/queryTaskDetail', param).then(res => {
    taskInfo.value = res.data
    if (refreshFrom) {
      formRef.value.fetchData()
    }
  })
}

</script>

<style lang="scss" scoped></style>