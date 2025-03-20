<template>
  <div class="flex  gap-2">
    <el-card class="flex-1" header="按类型分配" shadow="never">
      <el-table :data="data" class="w-full" stripe>
        <el-table-column prop="name" label="任务" width="60" />
        <el-table-column prop="type" label="类型" />
      </el-table>
    </el-card>
    <el-card class="flex-1" header="按小组分配任务" shadow="never">
      <el-table :data="data2" class="w-full" stripe>
        <el-table-column prop="name" label="任务" width="60" />
        <el-table-column prop="type" label="类型" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const data = ref([
  { name: '2', type: '已分配给用户' },
  { name: '0', type: '分配至 1 个或多个组' },
  { name: '1', type: '未分配' },
  { name: '2', type: '全部' },
])

const data2 = ref([
  { name: '2', type: '	销售量' },
  { name: '2', type: '全部' },
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