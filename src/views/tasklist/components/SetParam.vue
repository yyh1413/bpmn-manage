<template>
  <div>
    <div class="flex justify-between items-center mt-4 mb-6 text-xs pr-6">
      <LinkForDatePicker :icon="Calendar" :defaultValue="taskInfo.followUpDate" placeholder="设置跟进日期" @change='handleFollowUpDate' @clickClose="handleFollowUpDate">
      </LinkForDatePicker>
      <LinkForDatePicker :icon="Star" :defaultValue="taskInfo.dueDate" placeholder="设定到期日" @change='handleDueDate' @clickClose="handleDueDate">
      </LinkForDatePicker>

      <div class="flex items-center">
        <el-link title="添加组" :icon="Grid" type="primary" @click="groupOpen = true">{{ taskInfo.candidateGroupIdList.length ? taskInfo.candidateGroupIdList.join(',') : '添加组' }}</el-link>
        <!-- <el-icon color="#155cb5" class="ml-2 cursor-pointer" @click="" v-if="taskInfo.candidateGroupIdList.length">
          <CloseBold />
        </el-icon> -->
      </div>

      <div class="flex items-center">
        <el-link title="认领" :icon="UserFilled" type="primary" @click="handleClaim">{{ taskInfo.assignee || '认领' }}</el-link>
        <el-icon color="#155cb5" class="ml-2 cursor-pointer" @click="handleUnclaim" v-if="taskInfo.assignee">
          <CloseBold />
        </el-icon>
      </div>


      <el-dialog v-model="groupOpen" title="添加分组" width="500" :before-close="() => groupOpen = false" :modal="false">
        <div>
          <div class="flex items-center mb-4 text-xs">
            <el-icon>
              <InfoFilled />
            </el-icon>
            <span class="ml-2">您可以通过在输入字段中键入组ID，然后单击带加号的按钮来添加组。</span>
          </div>

          <div>
            <div class="flex mt-2">
              <div class="w-40 flex items-center text-[#155cb5] cursor-pointer pr-6 justify-end" @click="handleAddGroup">
                <span class="mr-1">添加组</span>
                <el-icon>
                  <Plus />
                </el-icon>
              </div>
              <div class="flex-1">
                <el-input v-model="groupName" placeholder="请输入组名" />
              </div>
            </div>

            <div class="flex my-6" v-for="(item, index) in taskInfo.candidateGroupIdList" :key="index">
              <div class="w-40 flex items-center  cursor-pointer pr-6 justify-end">
                <el-icon color="#155cb5" @click="handleDelGroup(item)">
                  <Close />
                </el-icon>
              </div>
              <div class="flex-1">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="groupOpen = false">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>


    </div>
  </div>
</template>

<script setup>
import { Calendar, Star, Grid, UserFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import http from '@/utils/http'
import LinkForDatePicker from '@/components/linkForDatePicker/index.vue'
const props = defineProps({
  taskInfo: {
    type: Object,
    default: () => ({})
  },
  setClaim: {
    type: Function,
    default: () => { }
  }
})

const groupOpen = ref(false);

const groupName = ref('')


const emit = defineEmits(['fetchTaskDetail'])
const handleClaim = () => {
  if (!props.taskInfo.assignee) {
    http.post('/pes/taskList/claim', {
      taskId: props.taskInfo.taskId
    }).then(res => {
      props.setClaim(props.taskInfo.taskId, 'zpjiang')
      emit('fetchTaskDetail', true)
    })
  }

}
const handleUnclaim = () => {
  http.post('/pes/taskList/unclaim', {
    taskId: props.taskInfo.taskId
  }).then(res => {
    props.setClaim(props.taskInfo.taskId, '')
    emit('fetchTaskDetail', true)
  })
}


const handleFollowUpDate = (val) => {
  http.post('/pes/taskList/update', {
    taskId: props.taskInfo.taskId,
    followUpDate: val || null,
    dueDate: props.taskInfo.dueDate,
  }).then(res => {
    emit('fetchTaskDetail', true)
  })
}

const handleDueDate = (val) => {
  http.post('/pes/taskList/update', {
    taskId: props.taskInfo.taskId,
    dueDate: val || null,
    followUpDate: props.taskInfo.followUpDate,
  }).then(res => {
    emit('fetchTaskDetail', true)
  })
}
const handleAddGroup = () => {
  if (!groupName.value) {
    return
  }
  if (props.taskInfo.candidateGroupIdList.includes(groupName.value)) {
    ElMessage.error('该分组已存在')
    return

  }
  http.post('/pes/taskList/addCandidate', {
    taskId: props.taskInfo.taskId,
    candidateGroupId: groupName.value
  }).then(res => {
    groupName.value = ''
    emit('fetchTaskDetail', true)
  })
}

const handleDelGroup = (id) => {
  http.post('/pes/taskList/deleteCandidate', {
    taskId: props.taskInfo.taskId,
    candidateGroupId: id
  }).then(res => {
    emit('fetchTaskDetail', true)
  })
}
</script>

<style lang='scss' scoped>
::v-deep .el-link__inner {
  font-weight: 400 !important;
  font-size: 12px !important;
}
</style>