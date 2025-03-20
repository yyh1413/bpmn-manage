<template>
  <el-card class="w-full" header="模型列表" shadow="never">
    <div class="absolute right-10 top-[50px]">
      <el-button type="primary" @click="handleAdd">新建</el-button>
      <!--   <el-tabs v-model="active" @tab-click="(e) => active = e.props.name">
        <el-tab-pane label="列表" name="1"></el-tab-pane>
        <el-tab-pane label="预览" name="2"></el-tab-pane>
      </el-tabs>-->
    </div>

    <el-input v-model="kw" class="w-full" placeholder="用户名和key检索" @keydown.enter="fetchData" />
    <div v-if="active === '1'">
      <el-table :data="data.list" class="w-full" stripe size="small">
        <el-table-column prop="id" label="ID" />

        <el-table-column prop="key" label="key">
          <template #default="scope">
            <Link :text="scope.row.procKey">
            </Link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称">
          <template #default="scope">
            <Link :text="scope.row.name">
            </Link>
          </template>
        </el-table-column>
        <el-table-column prop="version" label="版本" />
        <el-table-column prop="recCrtTs" label="创建时间" />
        <el-table-column prop="recUpdTs" label="修改时间" />
        <el-table-column label="操作" width="170" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" text @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确认部署当前流程吗?" @confirm="handleDeploy(scope.row)">
              <template #reference>
                <el-button type="primary" size="small" text>部署</el-button>
              </template>
            </el-popconfirm>

            <el-popconfirm title="确认删除当前流程图吗?" @confirm="handleDel(scope.row)">
              <template #reference>
                <el-button type="primary" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="data.total" :page-size="data.size" v-model:current-page="data.page" @current-change="fetchData" size="small" />
    </div>
    <div v-else class="flex">
      <div class="w-1/4 p-3 cursor-pointer" v-for="item in data" :key="item.tenantID" @click="goPage(item)">
        <div class="previews" style="border: 1px solid #ccc;">
          <div class="head h-8 flex items-center text-[18px] bg-[#f5f5f5] pl-2">
            {{ item.key }}
          </div>
          <div class="h-[226px]">
            <FlowChart />
          </div>
          <div class="footer h-10 flex items-center  text-[16px] ] bg-[#f5f5f5] pl-2">
            2 running instances
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import http from '@/utils/http'
import Link from '@/components/link/Link.vue'
import FlowChart from '@/components/flowChart/FlowChart.vue'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
const router = useRouter();
const active = ref('1')
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
  http.post('/pes/model/queryList', param).then(res => {
    data.list = res.data.content
    data.total = res.data.totalElements
    data.page = res.data.number

  })
}

function handleAdd() {
  router.push({ path: '/cockpit/process' })
}
function handleEdit(row) {
  router.push({ path: '/cockpit/process', query: { id: row.id } })
}
function handleDel(row) {
  http.post(`/pes/model/delete`, { id: row.id }).then(res => {
    ElMessage.success('删除成功')
    fetchData()
  })
}
function handleDeploy(row) {
  http.post(`/pes/model/deploy`, { id: row.id }).then(res => {
    ElMessage.success('部署成功')
  })
}
function handlePush(row) {

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