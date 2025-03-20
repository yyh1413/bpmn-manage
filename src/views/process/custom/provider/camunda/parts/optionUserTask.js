import { is } from 'bpmn-js/lib/util/ModelUtil';
import Assignee from './components/Assignee';

export default function optionUserTask(element, groups) {
  if (is(element, 'bpmn:UserTask')) {
    setUserAssignment(groups);
  }
}

//修改分配用户属性的委托人
function setUserAssignment(groups) {
  const entriesUserAssignment = groups.find(v => v.id === "CamundaPlatform__UserAssignment")?.entries
  if (entriesUserAssignment) {
    entriesUserAssignment.find(entry => entry.id === 'assignee').component = Assignee;
  }

}
