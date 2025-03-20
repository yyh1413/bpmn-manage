<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import FlowChart from './components/flowChart/FlowChart.vue';
</script>

<template>
  <!-- <div class="w-[1000px] h-[100vh]">
    <FlowChart />
  </div> -->

  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
