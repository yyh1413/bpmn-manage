<template>
  <el-tabs v-model="active" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="流程实例" name="1">

      <PrTable url="/pes/process/queryInstance" :params="{ procDefId: props.processInfo.procDefId }">
        <template #columns>
          <el-table-column prop="state" label="状态" width="180">
            <template #default="scope">
              <el-icon color="#5cb85c" size="20">
                <SuccessFilled v-if='scope.row.state == "0"' />
                <CircleCloseFilled v-else color="red" />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column prop="rootProcInstId" label="ID">
            <template #default="scope">
              <Link :text="scope.row.rootProcInstId" @click="goPage(scope.row)">
              </Link>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" />
          <el-table-column prop="businessKey" label="业务key">
          </el-table-column>
        </template>
      </PrTable>
    </el-tab-pane>
    <el-tab-pane label="事件" name="2">
      <PrTable url="/pes/process/queryIncident" :params="{ procDefId: props.processInfo.procDefId }">
        <template #columns>
          <el-table-column prop="incidentMessage" label="消息" />
          <el-table-column prop="procInstId" label="流程实例ID" />
          <el-table-column prop="incidentTimestamp" label="时间" />
          <el-table-column prop="activityName" label="环节名称" />
          <el-table-column prop="failedActivityIdName" label="失败环节名称" />
          <el-table-column prop="causeIncidentId" label="源事故ID" />
          <el-table-column prop="rootCauseIncidentId" label="根事故ID" />
          <el-table-column prop="incidentType" label="事故类型" />
          <el-table-column prop="annotation" label="注释" />
        </template>
      </PrTable>
    </el-tab-pane>
    <!-- <el-tab-pane label="调用流程定义" name="3">Role</el-tab-pane>
    <el-tab-pane label="职位定义" name="4">Task</el-tab-pane> -->
  </el-tabs>
</template>

<script setup>
import PrTable from '@/components/prTable/PrTable.vue'
import http from '@/utils/http'
const props = defineProps({
  processInfo: {
    type: Object,
    default: () => ({})
  }
})
const kw = ref('')
const active = ref('1')

const data = reactive({
  list: [],
  page: 1,
  size: 10,
  total: 0
})
onMounted(() => {
  // fetchData()
});

function fetchData() {

  http.post('/pes/process/queryInstance', {
    "page": 1,
    "size": 10,
    "procDefId": props.processInfo.procDefId,
  }).then(res => {
    data.list = res.data.content
    data.total = res.data.totalElements
    data.page = res.data.number

  })
}

function handleClick() {

}
</script>
