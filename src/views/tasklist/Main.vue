<template>
  <div class="flex h-full m-[-20px]">
    <section class="w-[220px] z-[2] ">
      <header>部署名称</header>
      <main>
        <div v-for="(item, index) in level1List" :key="index" class="mt-2 dep_list cursor-pointer" :style="{ 'border-color': active === item.id ? ' #b5152b' : '' }" @click="handleOneClick(item.id)">
          <div class="text-[16px]">{{ item.name }}</div>
        </div>
      </main>
    </section>
    <section class="w-[350px] z-[1]">
      <header></header>
      <main>
        <div v-for="(item, index) in level2List.list" :key="index" class="text-[18px] level_List cursor-pointer mb-5" :style="{ 'border-color': active2 === item.taskId ? ' #b5152b' : '' }"
          @click="handleTwoClick(item.taskId)">
          <div class="">
            <div class="text-[#000] text-[18px]">{{ item.taskName }}</div>
            <div class="text-[14px] text-[#000] my-[8px] flex justify-between">
              <span>{{ item.procDefName }}</span>
              <span>{{ item.assignee }}</span>
            </div>
            <div class="flex justify-between text-[12px]">
              <span>{{ item.createTime }}</span>
              <span>{{ item.priority }}</span>
            </div>
          </div>
        </div>
      </main>
    </section>
    <section class="flex-1 z-0">
      <header class="flex flex-row-reverse ">

      </header>
      <main>
        <Right :taskId="active2" @fetchTaskAll="fetchData" :setClaim="setClaim" />
      </main>
    </section>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import http from '@/utils/http'
import Right from './components/Right.vue'
const router = useRouter();
const level1List = ref([{ id: '1', name: '全部' }])
const active = ref('1')


const level2List = reactive({
  page: 1,
  size: 1000,
  total: 0,
  list: [
  ]
})
const active2 = ref('')

onMounted(() => {
  fetchData()
});

function handleTwoClick(id) {
  active2.value = id;
}

function handleOneClick(id) {
  active.value = id
}
function fetchData() {
  const param = {
    "page": level2List.page,
    "size": level2List.size,
  }
  http.post('/pes/taskList/queryAllTaskPage', param).then(res => {
    level2List.list = res.data.content
    level2List.total = res.data.totalElements
  })
}

function setClaim(id, name) {
  level2List.list.forEach(item => {
    if (item.taskId === id) {
      item.assignee = name
    }
  })

}

</script>

<style lang="scss" scoped>
.dep_list {
  font-size: 12px;
  border: 3px solid transparent;
  border-width: 0 0 0 3px;
  padding-left: 10px;
  margin-right: 5px;
}

.level_List {
  border: 3px solid transparent;
  border-width: 0 0 0 3px;
  padding-left: 10px;
  margin-right: 5px;
}

.dep_list:hover,
.level_List:hover {
  border-color: #2815b5;

}

label {
  font-weight: 600;
}

section {
  box-shadow: 2px 3px 7px 1px #d1d1d1;
  position: relative;
}

header {
  padding: 10px;
  height: 35px;
  background: #fafafa;
  box-shadow: -4px 3px 7px 1px #d1d1d1;
  z-index: 100;
  position: relative;
}

main {
  overflow: auto;
  padding: 10px;
  background: #fff;
  height: calc(100% - 35px);
}
</style>