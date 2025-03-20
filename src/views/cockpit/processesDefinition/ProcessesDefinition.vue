<template>
  <div class="flex h-full w-full" v-if="processInfo">
    <Left :leftData="leftData" :processInfo="processInfo" @changeVersion="changeVersion" />
    <Right :bpmnStr="processInfo.bpmnStr" :processInfo="processInfo" />
  </div>
</template>

<script setup>
import http from '@/utils/http'
import { useRouter } from "vue-router";
const router = useRouter();
import Left from './components/Left.vue'
import Right from './components/Right.vue'
import { useRoute } from 'vue-router'
const leftData = computed(() => [
  { name: "定义版本", value: processInfo.value.version, url: "", versionList: processInfo.value.versionList },
  { name: "版本标记", value: processInfo.value.versionTag, url: "" },
  { name: "流程定义ID", value: processInfo.value.procDefId, url: "", copy: true },
  { name: "流程定义KEY", value: processInfo.value.procDefKey, url: "", copy: true },
  { name: "定义名称", value: processInfo.value.procDefName, url: "" },
  { name: "历史生存时间", value: processInfo.value.historyTimeToLive, url: "1111", copy: true },
  { name: "部署 ID", value: processInfo.value.deploymentId, url: "222", copy: true },
  { name: "正在运行的实例", value: [{ name: '当前版本', value: processInfo.value.curVersionRun }, { name: '所有版本', value: processInfo.value.allVersionRun }], url: "" },
]);
const route = useRoute()
const processInfo = ref()
const procDefId = ref(route.query.procDefId)
onMounted(() => {
  getProcessesDefinition()
})
const getProcessesDefinition = () => {
  http.post('/pes/process/queryDetail',
    {
      "procDefId": procDefId.value
    }).then(res => {
      processInfo.value = res.data
    })

}

const changeVersion = (id) => {
  router.push('/cockpit/process-definition?procDefId=' + id)
  // processInfo.value = undefined;
  // procDefId.value = id
  // getProcessesDefinition()
}
</script>

<style>
.main {
  background: #fafafa !important;
}
</style>