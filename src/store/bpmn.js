import { defineStore } from 'pinia'

export const useBpmnStore = defineStore('bpmn', () => {
  const bpmnModeler = ref()

  return { bpmnModeler }
})
