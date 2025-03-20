<template>
  <div class="flex h-full m-[-20px]">
    <section class="w-[250px] z-20 ">
      <header>部署名称</header>
      <main>
        <el-input placeholder="名称id检索"></el-input>
        <div v-for="(item, index) in data" :key="index" class="mt-5 dep_list cursor-pointer"
          :style="{ 'border-color': active === item.id ? ' #b5152b' : '' }" @click="handleOneClick(item.id)">
          <div class="text-[16px]">{{ item.name }}</div>
          <div class="flex justify-between mb-1">
            <label>时间：</label>
            <span>{{ item.time }}</span>
          </div>
          <div class="flex justify-between mb-1">
            <label>来源：</label>
            <span>{{ item.org }}</span>
          </div>
          <div class="flex justify-between mb-1">
            <label>id：</label>
            <span class="els">{{ item.id }}</span>
          </div>
        </div>
      </main>
    </section>
    <section class="w-[400px] z-10">
      <header></header>
      <main>

        <div v-for="(item, index) in level2List" :key="index" class="text-[18px] level_List cursor-pointer mb-5"
          :style="{ 'border-color': active2 === item.id ? ' #b5152b' : '' }" @click="handleTwoClick(item.id)">
          {{ item.name }}
        </div>
      </main>
    </section>
    <section class="flex-1 z-0">
      <header class="flex flex-row-reverse ">
        <div class="text-[#155cb5]">
          <el-icon color="#155cb5" size="18">
            <UploadFilled />
          </el-icon>
          下载
        </div>
      </header>
      <main>
        <h1 v-if="!level2Item"> 在列表中选择一个资源
        </h1>
        <div v-else>
          <div class="flex justify-between text-[20px]">
            <h1>{{ level2Item.name }}</h1>
            <h1>Version: 1</h1>
          </div>
          <div class="m-4 h-[600px]" style="border: 1px solid #ddd;">
            <FlowChart />
          </div>
          <h1>定义：</h1>
          <el-table :data="dataTable" class="w-full" stripe>
            <el-table-column prop="name" label="姓名" width="180">
              <template #default="scope">
                <Link :text="scope.row.name" @click="goPage(scope.row)">
                </Link>
              </template>
            </el-table-column>

            <el-table-column prop="tenantID" label="用户ID" />
          </el-table>
        </div>
      </main>
    </section>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import FlowChart from '@/components/flowChart/FlowChart.vue'

const router = useRouter();
const data = ref([])
const active = ref('')
const active2 = ref('')
const level2List = ref([])
const level2Item = ref()

const dataTable = ref([
  {
    state: '2016-05-03',
    incidents: 0,
    running: 0,
    key: 'Review Invoice',
    name: 'Review Invoice',
    tenantID: 234223,
  },
  {
    state: '2016-05-03',
    incidents: 0,
    running: 0,
    key: 'Review Invoice',
    name: 'Review Invoice',
    tenantID: 33313,
  },
  {
    state: '2016-05-03',
    incidents: 0,
    running: 0,
    key: 'Review Invoice',
    name: 'Review Invoice',
    tenantID: 123131,
  },

])
onMounted(() => {

  fetchData()
});

function handleTwoClick(id) {
  active2.value = id;
  level2Item.value = level2List.value.find(item => item.id === id)
}

function handleOneClick(id) {
  active.value = id
  level2List.value = data.value.find(item => item.id === id).list
}
function fetchData() {

  data.value = [
    {
      name: '支付',
      org: '流程应用',
      id: 'ngfem21-1wefgb234',
      time: "2024-08-05T15:04:10",
      list: [
        { name: "付款.bpmn", id: 'gfem21-1wefgb234', },
        { name: "发票业务决策.bpmn", id: 'fn1gfem21-1wefg2b234', },
      ]
    },
    {
      name: '云闪付商户',
      org: '流程应用',
      id: '1-12wefgb234',
      time: "2024-08-05T15:04:10",
      list: [
        { name: "付款22.bpmn", id: 'fngfe3m21-1wefg3b234', },
        { name: "发票业务决策22.bpmn", id: 'fem21-1we4fgb234', },
      ]
    },
  ]
}


</script>

<!-- <style>
.main {
  padding: 0 !important
}
</style> -->
<style scoped>
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
  border-color: #b5152b;

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
  padding: 10px;
  background: #fff;
  height: calc(100% - 35px);
}
</style>