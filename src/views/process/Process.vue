<template>
  <div class="w-full flex h-full relative" v-loading="loading">

    <ul class="buttons absolute bottom-2 left-5 z-50">
      <li>
        <el-space wrap>
          <el-button @click="() => save(false)" type="primary">保 存</el-button>
          <el-button @click="() => save(true)" type="primary">保存并关闭</el-button>
        </el-space>
      </li>
    </ul>
    <div id="canvas" class="bg-white h-full h-[100vh] containers"></div>
    <div class="properties-panel-parent" id="js-properties-panel"></div>
  </div>
</template>

<script setup>
import { initBpmnModeler } from './utils'
import xmlStr1 from './xml.js'

import './css/index.css'
import { useRoute, useRouter } from 'vue-router';
import http from '@/utils/http'
import { useBpmnStore } from '@/store';
const bpmnModeler = useBpmnStore();
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const processInfo = ref({})

onMounted(() => {
  initBpmnModeler();
  createBpmnPanel()

})

function createBpmnPanel() {

  const id = route.query.id

  if (!id) return loadXML('create')

  loading.value = true
  processInfo.value.id = id
  http.post('/pes/model/queryDetail', { id }).then(res => {
    const { bpmnStr } = res.data
    loadXML('edit', bpmnStr)
  }).finally(() => {
    loading.value = false
  })
}

async function loadXML(type, xmlStr = xmlStr1) {
  if (type === 'create') {
    return await bpmnModeler.value.importXML(xmlStr);

    return await bpmnModeler.value.createDiagram()
  } else {
    return await bpmnModeler.value.importXML(xmlStr);
  }
}

async function save(close) {

  const { xml } = await bpmnModeler.value.saveXML({ format: true });
  console.log(xml);

  return
  http.post('/pes/model/save', { bpmnStr: xml, id: processInfo.value?.id }).then(res => {
    ElMessage.success('保存成功');
    if (close) {
      setTimeout(() => {
        router.back()
      }, 500);
    }
  })
}

</script>



<style lang="scss" scoped>
.djs-properties-panel * {
  user-select: text !important;
  -webkit-user-select: text !important;
}

.containers {
  width: 80%;
  background: white;
  overflow: auto;
  height: 100vh;
  background-image: linear-gradient(90deg,
      rgba(220, 220, 220, 0.5) 6%,
      transparent 0),
    linear-gradient(rgba(192, 192, 192, 0.5) 6%, transparent 0);
  background-size: 12px 12px;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

.properties-panel-parent {
  border-left: 1px solid #ccc;
  overflow: auto;
  width: 20%;
  height: 100vh;
  position: relative;

  &:empty {
    display: none;
  }

  >.djs-properties-panel {
    padding-bottom: 70px;
    min-height: 100%;
  }
}
</style>
