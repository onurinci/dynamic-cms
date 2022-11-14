<template>
  <div id="layout-wrapper">
    <Header/>
    <Sidebar/>
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.path" />
          </router-view>
        </div>
      </div>
    </div>
  </div>
  <Rightbar/>
</template>

<script setup>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import Rightbar from "./Rightbar.vue";
</script>

<style scoped>

</style>
