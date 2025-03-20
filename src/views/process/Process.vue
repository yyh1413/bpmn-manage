<template>
  <div class="w-full flex h-full relative" v-loading="loading">

    <ul class="buttons absolute bottom-2 left-5 z-50">
      <li>
        <el-space wrap>
          <el-button @click="save" type="primary">保 存</el-button>
          <el-button @click="() => save(true)" type="primary">保存并关闭</el-button>
        </el-space>
      </li>
    </ul>
    <div id="canvas" class="bg-white h-full h-[100vh] containers"></div>
    <div class="properties-panel-parent" id="js-properties-panel"></div>
  </div>
</template>

<script setup>
import OptionButton from './components/button.vue'
import xmlStr from '../../components/flowChart/xml'
import ZoomScrollModule from "diagram-js/lib/navigation/zoomscroll";
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import magicPropertiesProviderModule from './custom/provider/magic';
import magicModdleDescriptor from './custom/descriptors/magic';

import Modeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'

import CustomPropertiesProviderModule from './custom/provider/camunda/index';
import {
  CreateAppendAnythingModule,
  CreateAppendElementTemplatesModule
} from 'bpmn-js-create-append-anything';
import {
  ElementTemplatesPropertiesProviderModule,
} from 'bpmn-js-element-templates';

import Translate from './il18n/translation'


import { useRoute, useRouter } from 'vue-router';
import http from '@/utils/http'
import { useBpmnStore } from '@/store';
const bpmnModeler = useBpmnStore();
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const processInfo = ref({})


function initBpmnModeler() {
  bpmnModeler.value = new Modeler({
    container: '#canvas',
    propertiesPanel: {
      parent: '#js-properties-panel'
    },
    keyboard: {
      bindTo: window
    },
    additionalModules: [
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      CamundaPlatformPropertiesProviderModule,
      CustomPropertiesProviderModule,
      // magicPropertiesProviderModule,
      ElementTemplatesPropertiesProviderModule,
      CreateAppendAnythingModule,
      CreateAppendElementTemplatesModule,
      Translate
    ],
    moddleExtensions: {
      camunda: CamundaBpmnModdle,
      // magic: magicModdleDescriptor
    }

  });
}

onMounted(() => {

  initBpmnModeler();
  init()
})

function init() {

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

async function loadXML(type, xmlStr) {
  if (type === 'create') {
    return await bpmnModeler.value.createDiagram()
  } else {
    return await bpmnModeler.value.importXML(xmlStr);
  }
}

async function save(close) {

  const { xml } = await bpmnModeler.value.saveXML({ format: true });
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
