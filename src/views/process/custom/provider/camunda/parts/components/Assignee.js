import { useService } from 'bpmn-js-properties-panel';
import { html } from 'htm/preact';
import { TextFieldEntry, SelectEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useEffect, useState } from '@bpmn-io/properties-panel/preact/hooks';


export default function Assignee(props) {
  const { element, id } = props;
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    function fetchSpells() {
      setTimeout(() => {
        setUserList(availableSpells);
      });
    }

    fetchSpells();
  }, [setUserList]);
  const modeling = useService('modeling');
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
    return element.businessObject.assignee || '';
  };

  const setValue = value => {
    return modeling.updateProperties(element, {
      assignee: value
    });
  };

  const getOptions = () => {
    return [
      { label: '<none>', value: undefined },
      ...userList.map(spell => ({
        label: spell.name,
        value: spell.name,
      }))
    ];
  };

  return html`
    <${SelectEntry}
      id=${id}
      element=${element}
      label=${'处理人'}
      getValue=${getValue}
      setValue=${setValue}
      debounce=${debounce}
      getOptions=${getOptions}
    />
  `;
}