import Assignee from './components/Assignee';
import { hideProperties } from '@p/utils/setProperties';
import { userTaskShowGroup } from '@p/config/properties';

export default function optionNode(element, groups) {
  // console.log(groups.value);

  setUserAssignment(groups);
  hideProperties(groups, userTaskShowGroup);
}

//修改分配用户属性的处理人
function setUserAssignment(groups) {
  const entriesUserAssignment = groups.value.find(v => v.id === "CamundaPlatform__UserAssignment")?.entries
  if (entriesUserAssignment) {
    entriesUserAssignment.find(entry => entry.id === 'assignee').component = Assignee;
  }

}