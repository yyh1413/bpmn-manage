import { html } from 'htm/preact';
import { TextFieldEntry, SelectEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

export default function (element) {
  return [
    {
      id: 'description',
      element,
      component: Description,
    },
    {
      id: 'spell',
      element,
      component: Spell,
    },

  ];
}

function Spell(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput'); // 可以不使用这个

  // 假设我们有一个固定的法术列表
  const availableSpells = [
    { name: 'Fireball', value: 'fireball' },
    { name: 'Ice Blast', value: 'ice-blast' },
    { name: 'Teleport', value: 'teleport' },
    { name: 'Invisibility', value: 'invisibility' },
    { name: 'Lightning Strike', value: 'lightning-strike' }
  ];

  const getValue = () => {
    return element.businessObject.spell || '';
  };

  const setValue = value => {
    return modeling.updateProperties(element, {
      spell: value
    });
  };

  const getOptions = () => {
    return availableSpells.map(spell => ({
      value: spell.value,
      label: spell.name
    }));
  };

  return html`
    <${SelectEntry}
      id=${id}
      element=${element}
      label=${translate('下拉框')}
      description=${translate('下拉框')}
      getValue=${getValue}
      setValue=${setValue}
      debounce=${debounce}
      tooltip=${translate('下拉框')}
      getOptions=${getOptions}
    />
  `;
}

function Description(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.description || '';
  };

  const setValue = value => {
    return modeling.updateProperties(element, {
      description: value
    });
  };

  return html`
    <${TextFieldEntry}
      id=${id}
      element=${element}
      label=${translate('文本')}
      description=${translate('文本')}
      getValue=${getValue}
      setValue=${setValue}
      debounce=${debounce}
      tooltip=${translate('文本')}
    />
  `;
}
