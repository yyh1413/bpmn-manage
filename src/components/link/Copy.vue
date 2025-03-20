<template>
  <el-icon color="#155cb5" @click="handleCopy" v-show="show" class="cursor-pointer" size="16">
    <Checked />
  </el-icon>
</template>

<script setup>
const props = defineProps(['text', 'show'])

function handleCopy(e) {
  e.stopPropagation()
  e.preventDefault()
  let oInput = document.createElement('input');
  oInput.value = props.text;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象;
  document.execCommand("Copy"); // 执行浏览器复制命令
  oInput.remove();
  // 在你的 setup 方法中
  ElMessage({
    type: 'success',
    message: '复制成功！',
    grouping: true
  })
}
</script>
