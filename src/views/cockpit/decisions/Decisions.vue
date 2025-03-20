<template>
  <el-card class="w-full" header="部署了 2 个决策定义" shadow="never">

    <el-table :data="data" class="w-full" stripe>

      <el-table-column prop="name" label="姓名" width="180">
        <template #default="scope">
          <Link :text="scope.row.name" @click="goPage(scope.row)">
          </Link>
        </template>
      </el-table-column>

      <el-table-column prop="tenantID" label="用户ID" />
    </el-table>
  </el-card>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const data = ref([
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

function fetchData() {
  console.log('search');
}

function goPage(row) {
  router.push({ path: '/cockpit/process-definition', query: { tenantID: row.tenantID } })
}

</script>


<style scoped>
.previews:hover {
  border: 1px solid #395aff !important;
  box-sizing: border-box;
}

.el-tabs {
  width: fit-content;
}
</style>