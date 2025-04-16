import message from '@p/utils/message'
const validateUserTask = (element) => {
  const { businessObject } = element

  const validateList = []
  if (!businessObject.name) {
    validateList.push('名称不能为空')

  }

  if (businessObject.loopCharacteristics) {
    if (!businessObject.loopCharacteristics.collection) {
      validateList.push('多处理集合不能为空')

    }
    if (!businessObject.loopCharacteristics.elementVariable) {
      validateList.push('多处理标识不能为空')
    }
  }

  if ((!businessObject.assignee && !businessObject.candidateUsers) || (businessObject.assignee && businessObject.candidateUsers)) {
    validateList.push('处理人和多处理人不能同时为空或同时存在')
  }
  message.error(validateList)
  return validateList.length === 0
}

export default validateUserTask