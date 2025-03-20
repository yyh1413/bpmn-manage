<template>
  <div class="flex justify-between">
    <div class="w-[64%]">
      <el-card class="w-full mb-5" header="应用" shadow="never">
        <div class="flex justify-around">
          <div v-for="item in applications" :key="item.name" class="cursor-pointer" @click="goPage(item.path)">
            <img :src="item.icon" alt="" class="w-[200px] h-[200px] scale-[1.4]">
            <div class="text-center text-[#155cb5] text-[24px] "> {{ item.name }}</div>
          </div>
        </div>
      </el-card>
      <el-card class="w-full" header="链接" shadow="never">
        <div class="text-[#155cb5]">文档 </div>
        <div>学习处理 Camunda Modeler 的基础知识，学习如何建模和配置完全可执行的过程，以及如何集成您自己的业务逻辑。</div>
      </el-card>
    </div>
    <div class="w-[35%]">
      <el-card class="w-full" header="介绍" shadow="never">
        <div class="text-[18] mb-3"> 演示 演示</div>
        <div class=" mb-3"> http://localhost:5173/</div>
        <div class=" text-[#155cb5] mb-4">编辑配置文件 </div>
        <el-divider></el-divider>
        <div class="text-[18] mb-3">分组</div>
        <ul>
          <li>使用 Camunda Modeler 创建 DMN 表</li>
        </ul>
      </el-card>
    </div>
  </div>
</template>
<script setup>
import cockpit from '@/assets/images/svg/cockpit.svg'
import tasklist from '@/assets/images/svg/tasklist.svg'
import admin from '@/assets/images/svg/admin.svg'
import { useRouter } from "vue-router";

const router = useRouter();
const applications = [
  {
    icon: cockpit,
    name: '驾驶舱',
    path: '/cockpit/dashboard'
  },
  {
    icon: tasklist,
    name: '任务列表',
    path: '/tasklist'
  },
  {
    icon: admin,
    name: '管理',
    path: '/admin'
  }
]

function goPage(path) {
  router.push(path)
}
</script>

<style scoped></style>
