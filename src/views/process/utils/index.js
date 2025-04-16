// import xmlStr from '../../../components/flowChart/xml'
import magicPropertiesProviderModule from '../custom/provider/magic';
import magicModdleDescriptor from '../custom/descriptors/magic';

import Modeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'

import CustomProviderModule from '../custom/provider';

import {
  CreateAppendAnythingModule,
  CreateAppendElementTemplatesModule
} from 'bpmn-js-create-append-anything';
import {
  ElementTemplatesPropertiesProviderModule,
} from 'bpmn-js-element-templates';

import Translate from '../il18n/translation'
import { useBpmnStore } from '@/store';
const bpmnModeler = useBpmnStore();
import { handleListenEvents } from '../events'

function initBpmnModeler() {

  bpmnModeler.value = new Modeler({
    container: '#canvas',
    propertiesPanel: {
      parent: '#js-properties-panel'
    },
    keyboard: {
      bindTo: window
    },
    additionalModules: [
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      CamundaPlatformPropertiesProviderModule,
      // magicPropertiesProviderModule,
      ElementTemplatesPropertiesProviderModule,
      CreateAppendAnythingModule,
      CreateAppendElementTemplatesModule,
      Translate,
      CustomProviderModule,

    ],

    moddleExtensions: {
      camunda: CamundaBpmnModdle,
      // magic: magicModdleDescriptor
    }

  });

  handleListenEvents()

}


export {
  initBpmnModeler,
}