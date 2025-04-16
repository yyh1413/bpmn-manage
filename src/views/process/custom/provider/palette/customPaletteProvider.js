import { paletteElementsToHide } from '../../../config';
/**
 * 自定义 BPMN 面板 (Palette) 提供者
 * 用于控制 BPMN 建模工具左侧面板的显示内容
 */
class CustomPalette {
  /**
   * 构造函数，注入必要的依赖
   * @param {Object} bpmnFactory - BPMN 元素工厂，用于创建 BPMN 元素
   * @param {Function} create - 创建元素的工具方法
   * @param {Object} elementFactory - 元素工厂，用于生成元素定义
   * @param {Object} palette - BPMN 面板服务
   * @param {Function} translate - 国际化翻译函数
   */
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    // 保存注入的依赖
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    // 注册当前类为面板提供者
    palette.registerProvider(this);
  }

  /**
   * 获取面板条目（必须实现的方法）
   * @returns {Function} 返回一个函数，该函数接收默认面板条目并返回过滤后的条目
   */
  getPaletteEntries() {
    return function (entries, a) {
      // 打印默认面板条目（调试用，查看所有可用的元素ID）
      // console.log("所有默认面板条目:", entries);
      // console.log("所有默认面板条目:", JSON.parse(JSON.stringify(entries)));

      // 遍历要隐藏的元素ID列表
      paletteElementsToHide().forEach(id => {
        // 如果该ID存在于默认面板条目中，则删除它
        if (entries[id]) {
          delete entries[id];
        }
      });

      // 返回过滤后的面板条目
      return entries;
    };
  }
}

/**
 * 依赖注入声明（AngularJS 风格）
 * 这里列出构造函数所需的依赖项，BPMN.js 会自动注入
 */
CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
];

/**
 * 导出模块配置
 * 告诉 BPMN.js 初始化时加载这个自定义面板提供者
 */
export default CustomPalette