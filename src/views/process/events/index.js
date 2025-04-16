
import handleChanged from '../validate/changed'
import { useBpmnStore } from '@/store';

const bpmnModeler = useBpmnStore();
const handleListenEvents = () => {
  // 假设你已经有一个 bpmnModeler 实例
  const eventBus = bpmnModeler.value.get('eventBus');

  // 监听 selection.changed 事件
  eventBus.on('selection.changed', function (event) {
    const { oldSelection, newSelection } = event;

    // 如果 oldSelection 中包含你关心的元素，而 newSelection 不包含
    oldSelection.forEach((element) => {
      const wasDeselected = !newSelection.includes(element);
      if (wasDeselected) {

        handleChanged(element);
      }
    });
  });


}

export { handleListenEvents };