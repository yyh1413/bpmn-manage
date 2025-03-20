<template>
  <div class="flex items-center">
    <el-link :title='placeholder' :icon="icon" type="primary" @click="clickDate" v-show="!openDate">{{ value || placeholder }}</el-link>
    <el-date-picker ref="dateRef" v-if="openDate" v-model="value" type="datetime" :shortcuts="shortcuts" size="small" @change="handleDate" @blur="onBlur" value-format='YYYY-MM-DD HH:mm:ss'
      format="YYYY-MM-DD HH:mm:ss" />
    <el-icon color="#155cb5" class="ml-2 cursor-pointer" @click="handleDateDel" v-if="value">
      <CloseBold />
    </el-icon>
  </div>
</template>

<script setup>
import { Calendar } from '@element-plus/icons-vue'
const props = defineProps({
  defaultValue: {
    type: String,
    default: () => ''
  },
  placeholder: {
    type: String,
    default: () => '请选择日期'
  },
  icon: {
    type: Object,
  }
})

const emit = defineEmits(['change', 'clickClose'])
const value = ref()

watchEffect(() => {
  value.value = props.defaultValue
})

const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '明天',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      return date
    },
  },
  {
    text: '一周后',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      return date
    },
  },
]

const openDate = ref(false)
const dateRef = ref(null)


const handleDateDel = () => {
  emit('clickClose')
}

const handleDate = (val) => {
  // value.value = val
  openDate.value = false
  emit('change', val)

}
const clickDate = () => {
  openDate.value = true
  nextTick(() => {
    dateRef.value.focus()
  })
}

const onBlur = () => {
  openDate.value = false
}
</script>

<style lang='scss' scoped>
::v-deep .el-link__inner {
  font-weight: 400 !important;
  font-size: 12px !important;
}
</style>