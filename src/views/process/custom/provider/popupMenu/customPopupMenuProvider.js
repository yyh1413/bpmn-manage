import { popupMenuToHide } from '../../../config';

class CustomPopupMenuProvider {
  constructor(popupMenu, modeling, translate) {
    this._modeling = modeling;
    this._translate = translate;

    // ✅ 注册到 bpmn-replace 菜单类型
    popupMenu.registerProvider('bpmn-replace', this);
  }

  getPopupMenuEntries(element) {
    const modeling = this._modeling;
    const translate = this._translate;

    return (entries) => {
      // console.log('Popup entries before custom modification:', JSON.stringify(entries, null, 2));
      popupMenuToHide().forEach(id => {
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

// 注入依赖
CustomPopupMenuProvider.$inject = [
  'popupMenu',
  'modeling',
  'translate',
];


export default CustomPopupMenuProvider;