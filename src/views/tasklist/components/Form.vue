<template>
  <div class="p-2 relative">
    <div class="modify" v-if="!modify"></div>
    <div>
      <el-icon>
        <QuestionFilled />
      </el-icon><span>
        您可以通过单击下面的“添加变量”链接，使用通用表单设置变量。
      </span>
    </div>
    <div class="flex items-center">
      <span class="font-bold my-4 w-24 text-right pr-3">业务 key</span>
      <el-input v-model="formData.businessKey" class="flex-1" disabled="" />
    </div>
    <div class="flex mt-2">
      <div class="w-24 flex items-center text-[#155cb5] cursor-pointer pr-3 justify-end" @click="addVariable">
        <span class="mr-1">添加变量</span>
        <el-icon>
          <Plus />
        </el-icon>
      </div>
      <div class="flex-1 flex gap-5 text-[#333] font-bold" v-show="formData.variables.length">
        <div class="flex-1">名称</div>
        <div class="flex-1">值</div>
      </div>
    </div>
    <el-form ref="ruleFormRef" :model="formData">
      <div class="flex mt-4" v-for="(item, index) in formData.variables" :key="index">
        <div class="w-24 flex  text-[#155cb5] cursor-pointer items-baseline  pr-3 justify-end pt-1" @click="removeVariable(index)">
          <span class="mr-1">删除</span>
          <el-icon>
            <Minus />
          </el-icon>
        </div>
        <div class="flex-1 flex gap-5 text-[#333] font-bold">
          <div class="flex-1">
            <el-form-item :prop="'variables.' + index + '.name'" :rules='[{ required: true, message: "请输入变量名称" }]'>
              <el-input v-model="item.name" :disabled="!modify" />
            </el-form-item>
          </div>
          <div class="flex-1">
            <el-form-item :prop="'variables.' + index + '.value'" :rules='[{ required: true, message: "请输入变量值" }]'>
              <el-input v-model="item.value" :disabled="!modify" />
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>

    <div class="flex justify-end mt-4">
      <el-button type="primary" @click="submitForm()" :disabled="!modify">完成任务</el-button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import http from '@/utils/http'


const ruleFormRef = ref()

const modify = ref(true)

const emit = defineEmits(['fetchTaskAll'])
const props = defineProps({
  taskId: {
    type: String,
    default: () => ''
  }
})
const formData = ref({ variables: [] })

watch(() => props.taskId, (newVal) => {
  fetchData()
}, { immediate: true })

function fetchData() {
  const param = {
    taskId: props.taskId,
  }
  http.post('/pes/taskList/queryTaskForm', param).then(res => {
    formData.value = res.data
    modify.value = res.data.modify
  })
}
defineExpose({
  fetchData
})

function addVariable() {
  if (!modify.value) return
  formData.value.variables.push({ name: '', value: '' })
}
function removeVariable(index) {
  if (!modify.value) return
  formData.value.variables.splice(index, 1)
}
function submitForm() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      formData.value.variables.forEach(item => {
        item.type = 'string'
      })
      const param = { taskId: props.taskId, variables: formData.value.variables }
      http.post('/pes/taskList/complete', param).then(res => {
        emit('fetchTaskAll')
      })

    } else {
      ElMessage({ message: '请输入完整信息', grouping: true, type: 'error' })
      return false
    }
  })
}
</script>

<style lang='scss' scoped>
.el-button--primary {
  background-color: #b5152b !important;
  border-color: #b5152b !important;

}

.modify {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, .05);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {}
</style>