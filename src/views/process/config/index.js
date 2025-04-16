// 定义要隐藏的元素ID列表
const paletteElementsToHide = () => {
  return [
    'create.data-object', // 隐藏数据对象
    'create.data-store', // 隐藏数据存储
    'create.group', // 隐藏组
    'create.intermediate-event', // 隐藏中间事件
    'create.participant-expanded', // 隐藏参与者
    'create.subprocess-expanded', // 隐藏子流程

  ];

}

const popupMenuToHide = () => {
  const startElement = [
    'replace-with-none-intermediate-throwing', // 隐藏替换为无事件抛出中间事件
    'replace-with-message-start', // 隐藏替换为消息启动事件
    'replace-with-signal-start',
  ]
  const taskElement = [
    'replace-with-send-task', // 隐藏替换为发送任务
    'replace-with-receive-task',  // 隐藏替换为接收任务
    'replace-with-manual-task', // 隐藏替换为手动任务
    'replace-with-rule-task', // 隐藏替换为规则任务
    'replace-with-script-task', // 隐藏替换为脚本任务
    'replace-with-call-activity', // 隐藏替换为调用活动
    'replace-with-collapsed-subprocess', // 隐藏替换为折叠子流程
    'replace-with-expanded-subprocess', // 隐藏替换为展开子流程
  ]
  const intermediateEvent = []
  const excludeElement = [
    'replace-with-complex-gateway', // 隐藏替换为复杂网关
    'replace-with-event-based-gateway' // 隐藏替换为事件网关
  ]
  return [
    ...startElement,
    ...taskElement,
    ...intermediateEvent,
    ...excludeElement,
  ]
}

const contextPadEntriesToHide = () => {
  return [
    'append.intermediate-event'
  ];
}
export { paletteElementsToHide, popupMenuToHide, contextPadEntriesToHide };