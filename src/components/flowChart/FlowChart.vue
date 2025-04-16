<script setup>
import BpmnJS from 'bpmn-js';
import xmlStr from './xml.js' // 放在下面了
import ZoomScrollModule from "diagram-js/lib/navigation/zoomscroll";
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import { v4 } from 'uuid';
import CustomRenderer from './customRenderer/index.js';
import './index.css'
const props = defineProps({
  bpmnStr: {
    type: String,
    default: ''
  },
  isClick: {
    type: Boolean,
    default: false
  },
  taskDefId: {
    type: String,
    default: ''
  },
  activityStatsList: {
    type: Array,
    default: () => []
  }
})
const id = v4()
let viewer
let abortController;

async function init() {

  // console.log('init', props.taskDefId);

  viewer = new BpmnJS({
    container: '#canvas' + id,
    additionalModules: [
      ZoomScrollModule,
      MoveCanvasModule,
      // CustomRenderer
    ]
  });
  await viewer.importXML(xmlStr).then(function (result) {

    addEventStyle();
    viewer.get('canvas').zoom('fit-viewport', 'auto');
    addEventBusListener();
    addEventCustomElement();
    console.log(document.getElementById('zoom-in'));

    document.getElementById('zoom-in').addEventListener('click', () => {
      viewer.get('zoomScroll').stepZoom(1);
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
      console.log(1122);

      // viewer.get('zoomScroll').stepZoom(-1);
      viewer.get('canvas').zoom('fit-viewport', -1);
    });

    document.getElementById('zoom-reset').addEventListener('click', () => {
      viewer.get('canvas').zoom('fit-viewport', 'auto');
    });
    // centerDiagram();
  }).catch(function (err) {
    const { warnings, message } = err;
    console.log('something went wrong:', warnings, message);
  });

}

const addEventBusListener = () => {
  if (!props.isClick) return
  const eventBus = viewer?.get('eventBus');
  const canvas = viewer?.get('canvas')
  // 注册节点事件，eventTypes中可以写多个事件
  const eventTypes = ['element.click', 'element.hover'];

  eventBus.on('element.hover', function (event) {
    var element = event.element;
    // console.log('hover', element);
    if (element.type === "bpmn:UserTask") {
      var gfx = event.gfx;
      gfx.classList.add('pointer-cursor');
      canvas.addMarker(element.id, 'highlight');
    }
  });

  eventBus.on('element.out', function (event) {
    var element = event.element;
    var gfx = event.gfx;
    gfx.classList.remove('pointer-cursor');
    canvas.removeMarker(element.id, 'highlight');
  });

  eventTypes.forEach((eventType) => {
    eventBus?.on(eventType, (e) => {
      const { element } = e;
      // console.log('element', element);

      if (!element.parent) return;

      if (!e || element.type === 'bpmn:Process') {
        return false;
      } else {
        if (eventType === 'element.click') {
          console.log('element-click', e);
          // 节点点击后想要做的处理
          // 此时想要点击节点后，拿到节点实例，通过外部输入更新节点名称
          // this.currentElement = element;
        } else if (eventType === 'element.hover') {
          // 鼠标滑过节点后想要做的处理
          canvas.addMarker(element, 'yangshi');
        }
      }
    });
  });
}

function addEventStyle() {
  if (!props.taskDefId) return
  const elementRegistry = viewer.get('elementRegistry');

  const userTaskElement = elementRegistry.get(props.taskDefId);
  console.log('userTaskElement', userTaskElement);

  const canvas = viewer.get('canvas');
  canvas.addMarker(userTaskElement.id, 'highlight'); // 添加高亮标记

}

function addEventCustomElement() {
  // 获取 Overlays 服务
  const overlays = viewer.get('overlays');

  props.activityStatsList.forEach(item => {
    const shapeImpl = viewer.get('elementRegistry').get(item.taskDefId)
    // console.log('shapeImpl', shapeImpl);

    const whiteList = ['bpmn:UserTask', 'bpmn:CallActivity']
    if (!shapeImpl.type.includes('Gateway')) {
      // 添加覆盖层
      const overlayId = overlays.add(item.taskDefId, {
        position: {
          bottom: 20,
          left: -10
        },
        html: `<div class='sign_num' element_id='${item.taskDefId}'>${item.instances}</div>`
      });
    }
  })

  // 监听点击事件
  const overlayContainer = document.querySelector('.djs-overlay-container');
  abortController = new AbortController();
  overlayContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('sign_num')) {
      console.log('点击了覆盖层', event.target.getAttribute('element_id'));
    }
  }, { signal: abortController.signal }) // 绑定 signal);

  // 删除覆盖层
  // overlays.remove(overlayId);
}
onBeforeUnmount(() => {
  if (abortController) {
    abortController.abort(); // 取消所有绑定到该 signal 的事件监听器
  }
});
onMounted(() => {
  init()

})
</script>

<template>
  <div :id="'canvas' + id" class="bg-white h-full"></div>
  <div class="zoom-controls absolute top-0 right-0 m-4 z-50">
    <button id="zoom-in">放大</button>
    <button id="zoom-out">缩小</button>
    <button id="zoom-reset">还原</button>
  </div>
</template>

<style></style>
