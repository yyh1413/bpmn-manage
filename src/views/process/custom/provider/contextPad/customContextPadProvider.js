import { contextPadEntriesToHide } from '../../../config';

class CustomContextPadProvider {
  constructor(contextPad, modeling, elementFactory, create, translate) {
    this._modeling = modeling;
    this._elementFactory = elementFactory;
    this._create = create;
    this._translate = translate;

    // ✅ 注册自定义 provider，优先级设为 1000，确保执行
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const modeling = this._modeling;
    const elementFactory = this._elementFactory;
    const create = this._create;
    const translate = this._translate;

    return (entries) => {

      // console.log('ContextPad entries before custom modification:', JSON.stringify(entries, null, 2));
      contextPadEntriesToHide().forEach(id => {
        if (entries[id]) {
          delete entries[id];
        }
      });

      return entries;
    };
  }
}

// 注入依赖
CustomContextPadProvider.$inject = [
  'contextPad',
  'modeling',
  'elementFactory',
  'create',
  'translate'
];

export default CustomContextPadProvider;
