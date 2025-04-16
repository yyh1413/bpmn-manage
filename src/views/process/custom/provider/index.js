import CustomPropertiesProviderModule from './camunda/index';
import CustomPaletteProviderModule from './palette/customPaletteProvider';
import CustomPopupMenuProvider from './popupMenu/customPopupMenuProvider';
import CustomContextPadProvider from './contextPad/customContextPadProvider';


export default {
  __init__: [
    'customPropertiesProviderModule',
    'customPaletteProviderModule',
    'customPopupMenuProvider',
    'customContextPadProvider'
  ],
  customPropertiesProviderModule: ['type', CustomPropertiesProviderModule],
  customPaletteProviderModule: ['type', CustomPaletteProviderModule],
  customPopupMenuProvider: ['type', CustomPopupMenuProvider],
  customContextPadProvider: ['type', CustomContextPadProvider]

}