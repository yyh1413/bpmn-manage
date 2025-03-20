<script setup>
import { v4 } from 'uuid';
import http from '@/utils/http';
import { validateRequiredFields, validateDiagram, getPropertiesFromPanel } from '../utils/validate';
import { useBpmnStore } from '@/store';
import { useRouter } from 'vue-router';
const bpmnModeler = useBpmnStore();
const router = useRouter();
const emit = defineEmits(['loadXML'])

function update() {
  const elements = bpmnModeler.value.get('elementRegistry').get('StartEvent_1');
  console.log(elements);

  if (elements.type === 'bpmn:Process') {
    elements.id = 'process_112221'

  }
}

async function save(close) {
  // validateDiagram();
  // validateRequiredFields();
  // getPropertiesFromPanel()
  const { xml } = await bpmnModeler.value.saveXML({ format: true });
  http.post('/pes/model/save', { bpmnStr: xml }).then(res => {
    ElMessage.success('保存成功');
    if (close) {
      setTimeout(() => {
        router.back()
      }, 500);
    }
  })

  // var xmlBlob = new Blob([xml], {
  //   type: "application/bpmn20-xml;charset=UTF-8,"
  // });
  // var downloadLink = document.createElement("a");
  // downloadLink.download = v4() + "ops-coffee-bpmn.bpmn";
  // downloadLink.innerHTML = "Get BPMN SVG";
  // downloadLink.href = window.URL.createObjectURL(xmlBlob);
  // downloadLink.onclick = function (event) {
  //   document.body.removeChild(event.target);
  // };
  // downloadLink.style.visibility = "hidden";
  // document.body.appendChild(downloadLink);
  // downloadLink.click();


}

const refFile = ref(null)
function loadXML() {
  const files = refFile.value.files[0];

  const reader = new FileReader();
  reader.readAsText(files);
  reader.onload = function (evt) {
    const xmlStr = evt.target.result;
    emit('loadXML', xmlStr)
  }
}
</script>

<template>
  <ul class="buttons absolute bottom-2 left-5 z-50">
    <li>
      <el-space wrap>
        <el-button @click="save" type="primary">保 存</el-button>
        <el-button @click="() => save(true)" type="primary">保存并关闭</el-button>
      </el-space>
      <!-- <el-button @click="update" type="primary" size="large">修 改</el-button> -->
      <!-- <el-button @click="refFile.click()" type="primary" size="large">加载本地BPMN文件</el-button> -->
      <input type="file" id="files" ref="refFile" style="display: none" @change="loadXML" />
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
