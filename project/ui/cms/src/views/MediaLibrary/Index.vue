<template>
  <FileUpload/>
  <div class="row" v-if="data.deleteImages.length > 0">
    <div class="col-md-12">
      <button class="btn btn-danger" @click="deleteImages">Seçilenleri Sil</button>
    </div>
  </div>
  <Files @selected-images="selectedImages" :files="dataFiles"/>
</template>

<script setup>
  import {computed, onMounted, reactive} from "vue";
  import {mediaStore} from "@/store/media.js";
  import FileUpload from '@/components/MediaLibrary/FileUpload.vue';
  import Files from '@/components/MediaLibrary/Files.vue';

  const storeMedia = mediaStore();

  const data = reactive({
    deleteImages : [],
  });

  onMounted(async () => {
    await storeMedia.getFiles();
  });

  const dataFiles = computed(() => {
    return storeMedia._files;
  });

  const selectedImages = (args) => {
    data.deleteImages = args;
  }

  const deleteImages = async () => {
    await storeMedia.deleteFiles(data.deleteImages);
    await storeMedia.getFiles();
  }

</script>

<style scoped>

</style>
