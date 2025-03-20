<template>

  <!-- <el-card class="w-full mb-5" header="当前" shadow="never">
    <div class="flex justify-around">
      <div :id="`main${index}`" class="w-[200px] h-[200px]" v-for="(item, index) in rightNow" :key="item.name" @click="goPage(item)"></div>
    </div>
  </el-card> -->
  <el-card class="w-full mb-5" shadow="never">
    <div class="flex">
      <div v-for="item in deployed" :key="item.name" class="cursor-pointer w-1/4" @click="goPage(item.path)">
        <div class="  text-[16px] text-[#555] "> {{ item.name }}</div>
        <div class="text-[#155cb5] text-[28px]"> {{ item.num }}</div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import http from '@/utils/http'
const router = useRouter();
const rightNow = ref([
  {
    data: [
      { value: 2, name: '待处理' },
      { value: 6, name: '发票' },
    ],
    name: '正在运行流程实例',
    path: '/cockpit'
  },
  {
    data: [
      { value: 6, name: '待处理' },
      { value: 5, name: '发票' },
    ],
    name: '公开事件',
    path: '/tasklist'
  },
  {
    data: [
      { value: 2, name: '待处理' },
      { value: 3, name: '发票' },
    ],
    name: '开放人工任务',
    path: '/admin'
  },
])

const deployed = ref([
  {
    num: 3,
    name: '模型定义',
    path: '/cockpit/modalList'
  },
  {
    num: 3,
    name: '流程定义',
    path: '/cockpit/processesList'
  },
  // {
  //   num: 3,
  //   name: '决策定义',
  //   path: '/tasklist'
  // },
  // {
  //   num: 3,
  //   name: '案例定义',
  //   path: '/admin'
  // },
  // {
  //   num: 3,
  //   name: '部署',
  //   path: '/cockpit/deployment'
  // },
])

const getStatics = () => {
  http.post('/pes/cockpit/statistics').then(res => {
    deployed.value[0].num = res.data.modelCount;
    deployed.value[1].num = res.data.processCount;
  })
}

const echartInit = (data, index) => {
  const myChart = echarts.init(document.getElementById("main" + index));
  const sum = data['data'].reduce((acc, cur) => acc + cur.value, 0);
  const option = {
    title: {
      text: data.name,
      left: "center",
      bottom: 0,
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal'
      },
    },
    graphic: {
      type: 'text',
      left: 'center',
      y: 75,
      style: {
        text: sum, // 中心显示的数字或文本
        textAlign: 'center',
        fill: '#000', // 文字颜色
        fontSize: 30 // 文字大小
      }
    },
    series: [
      {
        color: ['#b2991e', '#1f39b2'],
        name: data.name,
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          // disabled: true,
          scale: false,
          label: {
            color: 'inherit',
            formatter: '{b}: {c}',
            show: true,
            fontSize: 18,
            position: 'outside',
          }
        },
        labelLine: {
          show: false
        },
        data: data.data
      }
    ]
  };
  myChart.setOption(option);
};
onMounted(() => {
  getStatics();
  // rightNow.value.forEach((v, i) => {
  //   echartInit(v, i);
  // })

});

function goPage(path) {
  router.push(path)
}
</script>
