// 校验必填项
import { useBpmnStore } from '@/store';
const bpmnModeler = useBpmnStore();

// 获取当前选中元素的属性
export function getPropertiesFromPanel() {
  const selectedElements = bpmnModeler.value.get('selection').get();
  console.log(selectedElements);

  selectedElements.forEach(element => {
    const propertiesPanel = bpmnModeler.value.get('propertiesPanel');

    // 获取当前选中元素的属性（可以查看 Panel 中展示的属性）
    const businessObject = element.businessObject;
    console.log('当前选中节点属性：', businessObject);

    // 如果你想显示更多属性，直接通过 `businessObject` 访问
    console.log('节点名称:', businessObject.name);
    console.log('节点类型:', businessObject.$type);
  });
}
export function validateRequiredFields() {
  // return
  const elements = bpmnModeler.value.get('elementRegistry').getAll();
  const requiredFieldsErrors = [];

  elements.forEach(element => {
    console.log('modeler', element.businessObject);
    const businessObject = element.businessObject;

    // 获取扩展属性
    if (businessObject.extensionElements) {
      const extensionElements = businessObject.extensionElements.values;
      extensionElements.forEach(extension => {
        console.log('扩展属性:', extension.$attrs);
      });
    }
    if (element.type === 'bpmn:Task' && !element.businessObject.name) {
      requiredFieldsErrors.push(`任务节点 ${element.id} 必须填写名称`);
    }
    // 可以根据其他类型的节点或属性继续添加校验
  });

  if (requiredFieldsErrors.length > 0) {
    alert(requiredFieldsErrors.join('\n'));
    return false;
  }
  return true;
}


// 校验流程图完整性
export function validateDiagram() {
  const elements = modeler.get('elementRegistry').getAll();
  let hasStartEvent = false;
  let hasEndEvent = false;
  const missingConnections = [];

  elements.forEach(element => {
    // 检查是否存在开始事件
    if (element.type === 'bpmn:StartEvent') {
      hasStartEvent = true;
    }

    // 检查是否存在结束事件
    if (element.type === 'bpmn:EndEvent') {
      hasEndEvent = true;
    }

    // 检查节点之间是否有连接（例如，任务节点是否有输出连线）
    if (element.type === 'bpmn:Task') {
      const outgoing = element.outgoing || [];
      if (outgoing.length === 0) {
        missingConnections.push(`任务节点 ${element.id} 没有输出连线`);
      }
    }
  });

  if (!hasStartEvent) {
    alert('流程图缺少开始事件');
    return false;
  }

  if (!hasEndEvent) {
    alert('流程图缺少结束事件');
    return false;
  }

  if (missingConnections.length > 0) {
    alert(missingConnections.join('\n'));
    return false;
  }

  return true;
}
