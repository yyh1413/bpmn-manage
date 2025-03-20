<template>
  <el-card class="w-full" header="流程列表" shadow="never">
    <!-- <el-input v-model="kw" class="w-full" placeholder="用户名和key检索" @keydown.enter="fetchData" /> -->
    <el-table :data="data.list" class="w-full" stripe size="small">
      <el-table-column prop="state" label="状态" width="180">
        <template #default="scope">
          <el-icon color="#5cb85c" size="20">
            <SuccessFilled v-if='scope.row.state == "0"' />
            <CircleCloseFilled v-else color="red" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="incidents" label="事故" width="180" />
      <el-table-column prop="instances" label="运行实例" />
      <el-table-column prop="procDefName" label="名称">
        <template #default="scope">
          <Link :text="scope.row.procDefName" @click="goPage(scope.row)">
          </Link>
        </template>
      </el-table-column>
      <el-table-column prop="version" label="流程版本" />
      <el-table-column prop="procDefKey" label="流程KEY" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="data.total" :page-size="data.size" v-model:current-page="data.page" @current-change="fetchData" size="small" />

  </el-card>
</template>

<script setup>
import http from '@/utils/http'
import Link from '@/components/link/Link.vue'
import { useRouter } from "vue-router";
const router = useRouter();
const kw = ref('')

const data = reactive({
  list: [],
  page: 1,
  size: 10,
  total: 0
})

onMounted(() => {
  fetchData()
});

function fetchData() {
  const param = {
    "page": data.page,
    "size": data.size,
  }
  http.post('/pes/process/queryList', param).then(res => {
    data.list = res.data.content
    data.total = res.data.totalElements
    data.page = res.data.number

  })

}

function goPage(row) {
  router.push('/cockpit/process-definition?procDefId=' + row.procDefId)
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