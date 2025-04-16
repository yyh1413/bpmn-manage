
const error = (messageArr) => {
  ElNotification.closeAll()
  if (!Array.isArray(messageArr) || messageArr.length === 0) {
    return
  }
  const list = messageArr.map(item => {
    return h('p', { style: 'color:red;font-size:12px;' }, item)
  })
  ElNotification({
    type: 'error',
    title: '提示',
    message:
      h('div', null, list),
    position: 'bottom-right',
  })
}

export default {
  error
}