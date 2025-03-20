<template>
  <div>
    <el-container>
      <Header />
      <div class="main">
        <router-view :key="$route.fullPath" />
      </div>
    </el-container>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>


<style scoped>
.main {
  margin-top: 42px;
  padding: 15px;
  background-color: #e5e5e5;
  position: absolute;
  height: calc(100% - (42px));
  width: 100%;
}
</style>
