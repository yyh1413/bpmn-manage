import optionUserTask from './parts/optionUserTask'
const LOW_PRIORITY = 500;

export default function CustomPropertiesProvider(propertiesPanel, translate) {
  this.getGroups = function (element) {
    return function (groups) {
      // 修改分配用户属性
      optionUserTask(element, groups);

      return groups;
    };
  };

  // 注册一个提供者，优先级为LOW_PRIORITY
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

CustomPropertiesProvider.$inject = ['propertiesPanel', 'translate'];
