<template>
  <div>
    <div v-for="(item, index) in initData.list" :key="item.id" class="flex items-center p-2 gap-10">
      <div class="text-[12px]  flex justify-center cir " v-if="item?.day != initData.list[index - 1]?.day">
        {{ item.day }}</div>
      <div class="w-[80px]" v-else></div>
      <div class="flex flex-col justify-center items-center w-[15%] border_bottom">
        <div class="mb-2">{{ item.time }}</div>
        <div>{{ item.userId }}</div>
      </div>
      <div class="border_bottom flex-1">
        <div class="mb-2 text-[18px] text-[#333]">{{ item.operationType }}</div>
        <div class="flex gap-10">
          <div class="font-bold text-[#000]">{{ item.property }}</div>
          <div class="line-through text-[#999]" v-if="item.orgValue">{{ item.orgValue }}</div>
          <div v-if="item.newValue">{{ item.newValue }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import http from '@/utils/http'

const props = defineProps({
  taskId: {
    type: String,
    default: ''
  }
})
const initData = reactive({
  list: [],
  page: 1,
  size: 100,
  total: 0
})

watch(() => props.taskId, (newVal) => {
  fetchData()
}, { immediate: true })

function fetchData() {
  const param = {
    taskId: props.taskId,
    "page": initData.page,
    "size": initData.size,
  }
  http.post('/pes/taskList/queryTaskHistory', param).then(res => {
    res.data.content.forEach(item => {
      item.day = item.timestamp.split(' ')[0]
      item.time = item.timestamp.split(' ')[1]
    })
    initData.list = res.data.content
    initData.total = res.data.totalElements
  })
}

</script>

<style lang='scss' scoped>
.border_bottom {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  margin-bottom: 10px;
  height: 76px;
}

.cir {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #f5f5f5;
  height: 80px;
  width: 80px;
  font-weight: 500;
}
</style>