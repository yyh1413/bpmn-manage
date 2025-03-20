<template>
  <div class="smart-table-container">
    <!-- 加载状态 -->
    <el-skeleton :rows="5" animated v-if="loading && !tableData.length" />

    <!-- 表格主体 -->
    <el-table v-else :data="tableData" highlight-current-row v-loading="loading" element-loading-text="数据加载中..." @sort-change="handleSortChange" stripe>
      <!-- 默认插槽：表格列 -->
      <slot name="columns"></slot>

      <!-- 空状态 -->
      <!-- <template #empty>
        <div class="empty-content">
          <el-empty description="暂无数据" />
        </div>
      </template> -->
    </el-table>

    <!-- 分页器 -->
  </div>
  <div class="pagination-wrapper" v-if="showPagination">
    <el-pagination background :layout="paginationLayout" :total="total" :page-size="innerPageSize" :page-sizes="pageSizes" :current-page="innerCurrentPage" @size-change="handleSizeChange"
      @current-change="handlePageChange" />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import http from '@/utils/http'
const props = defineProps({
  // 必填配置
  url: { type: String, required: true },      // 请求地址

  // 分页配置
  pageSize: { type: Number, default: 10 },    // 每页条数
  currentPage: { type: Number, default: 1 },  // 当前页码
  pageSizes: {                                // 每页条数选项
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  paginationLayout: {                         // 分页器布局
    type: String,
    default: "prev, pager, next"
  },
  showPagination: { type: Boolean, default: true }, // 是否显示分页

  // 请求配置
  params: { type: Object, default: () => ({}) },     // 额外请求参数
  pageKey: { type: String, default: 'page' },        // 分页参数key
  pageSizeKey: { type: String, default: 'size' },// 分页大小key
  immediate: { type: Boolean, default: true }, // 是否立即请求
  responseMap: {                                     // 响应数据映射
    type: Object,
    default: () => ({
      list: 'content',
      total: 'totalElements',
    })
  }
})

const emit = defineEmits([
  'update:pageSize',
  'update:currentPage',
  'request-success',
  'request-error'
])

// 响应式状态
const tableData = ref([])
const total = ref(0)
const loading = ref(false)
const innerPageSize = ref(props.pageSize)
const innerCurrentPage = ref(props.currentPage)

// 计算属性
const showPagination = computed(() => {
  return props.showPagination && total.value > 0
})

onMounted(() => {
  if (props.immediate) {
    fetchData() // 确保组件挂载时加载数据
  }
})
// 监听参数变化
watch(
  () => [props.url, props.params, innerPageSize.value, innerCurrentPage.value],
  () => fetchData(),
  { deep: true }
)

// 获取数据方法
const fetchData = async () => {
  try {
    loading.value = true

    const requestParams = {
      [props.pageKey]: innerCurrentPage.value,
      [props.pageSizeKey]: innerPageSize.value,
      ...props.params
    }

    const response = await http.post(props.url, requestParams)

    const { data } = response

    tableData.value = data[props.responseMap.list] || []
    total.value = data[props.responseMap.total] || 0

    emit('request-success', { data, params: requestParams })
  } catch (error) {
    emit('request-error', error)
  } finally {
    loading.value = false
  }
}

// 分页变化处理
const handleSizeChange = (size) => {
  innerPageSize.value = size
  emit('update:pageSize', size)
}

const handlePageChange = (page) => {
  innerCurrentPage.value = page
  emit('update:currentPage', page)
}

// 排序处理
const handleSortChange = ({ prop, order }) => {
  emit('sort-change', { prop, order })
}

// 暴露刷新方法
defineExpose({
  refresh: fetchData
})
</script>

<style scoped>
.smart-table-container {
  position: relative;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.empty-content {
  padding: 40px 0;
}
</style>