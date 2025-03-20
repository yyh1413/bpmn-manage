<template>
  <el-header class="flex items-center justify-between pl-5 pr-3">
    <div class="flex items-center h-full cursor-pointer">
      <img src="/public/logo.svg" alt="" width="20px" class="mr-2" @click="handleBack">
      <div class="text-lg text-[#000] mr-5" @click="handleBack">管理平台</div>
      <Menu :mainType="mainType" :path="path" />
    </div>
    <div>
      <el-dropdown @command="handleCommand" class="mr-5">
        <div class="flex items-center cursor-pointer">
          <el-icon size="20">
            <UserFilled />
          </el-icon>
          <span class="ml-2">杨宇豪</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1">我的配置</el-dropdown-item>
            <el-dropdown-item command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown @command="handleMenu" v-if="mainType !== 'welcome'">
        <div class="flex items-center cursor-pointer">
          <el-icon size="20">
            <HomeFilled />
          </el-icon>
          <el-icon size="12">
            <CaretBottom />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="/cockpit/dashboard">管理</el-dropdown-item>
            <el-dropdown-item command="/tasklist">任务列表</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>

</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import Menu from './Menu.vue'
const router = useRouter()
const route = useRoute()
const mainType = ref('')
const path = ref('')
watch(
  () => router.currentRoute.value,
  (newValue) => {
    mainType.value = newValue.name.split('-')[0]
    path.value = newValue.fullPath
  },
  { immediate: true }
)

function handleMenu(path) {
  router.push(path)
}
function handleCommand(item) {
  switch (item) {
    case '1':
      router.push('/')
      break
  }
}

function handleBack() {
  if (route.name.includes('cockpit')) {
    router.push('/cockpit/dashboard')
  } else {
    router.go(0)
  }

}
</script>

<style scoped>
.el-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 42px;
  z-index: 1030;
  margin-bottom: 0;
  box-shadow: 0 2px 10px -4px #555555;
  color: #777777;
  background-color: #fff;
  font-size: 14px;
}
</style>
