function hideProperties(groups, whiteList) {
  groups.value = groups.value.filter(v => {
    return whiteList.some(j => j.id === v.id)
  })
  groups.value.forEach(element => {
    element.entries = element.entries.filter(j => {
      return whiteList.find(b => b.id === element.id)?.entries?.some(k => k.id === j.id)
    })
  });
}

export {
  hideProperties
}