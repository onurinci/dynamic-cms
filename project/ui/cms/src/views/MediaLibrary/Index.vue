<template>
  <FileUpload/>
  <Files :files="dataFiles"/>
</template>

<script setup>
  import {computed, onMounted, ref} from "vue";
  import {mediaStore} from "@/store/media.js";
  import FileUpload from '@/components/MediaLibrary/FileUpload.vue';
  import Files from '@/components/MediaLibrary/Files.vue';

  const storeMedia = mediaStore();

  onMounted(() => {
    getFiles();
  });

  const getFiles = async () => {
    await storeMedia.getFiles();
  }

  const dataFiles = computed(() => {
    return storeMedia._files;
  });
</script>

<style scoped>

</style>
