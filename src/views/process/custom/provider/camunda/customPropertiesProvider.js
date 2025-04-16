import optionUserTask from './parts/optionUserTask';
// import optionNode from './parts/commonNode';
import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default class CustomPropertiesProvider {
  constructor(propertiesPanel, translate) {
    this._propertiesPanel = propertiesPanel;
    this._translate = translate;

    // 注册提供者，优先级为 LOW_PRIORITY
    this._propertiesPanel.registerProvider(LOW_PRIORITY, this);
  }

  getGroups(element) {
    return (groups) => {
      groups = { value: groups };

      if (is(element, 'bpmn:UserTask')) {
        // 修改分配用户属性
        optionUserTask(element, groups);
      }
      // optionNode(element, groups);
      return groups.value;
    };
  }
}

CustomPropertiesProvider.$inject = ['propertiesPanel', 'translate'];