

import validateUserTask from './userTask'
import { useBpmnStore } from '@/store';

const bpmnModeler = useBpmnStore();
const handleChanged = (element) => {

  let validateFlag = true;

  if (element.type === 'bpmn:UserTask') {
    // console.log('节点被取消选中:', element, JSON.stringify(element.businessObject, null, 4));

    validateFlag = validateUserTask(element)
  }

  if (!validateFlag) {
    handleSelectionChanged(element)
  }
}

function handleSelectionChanged(event) {
  setTimeout(() => {
    const elementRegistry = bpmnModeler.value.get('elementRegistry');
    const selection = bpmnModeler.value.get('selection');
    const eventBus = bpmnModeler.value.get('eventBus');

    const userTask = event || elementRegistry.filter(el => el.type === 'bpmn:UserTask')[0];
    // console.log(userTask);

    if (userTask) {
      selection.select(userTask);

      // 手动触发事件，通知属性面板
      eventBus.fire('selection.changed', {
        oldSelection: [],
        newSelection: [userTask]
      });
    }

  });
}
export default handleChanged