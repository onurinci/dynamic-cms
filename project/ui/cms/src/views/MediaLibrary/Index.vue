<template>
  <div class="row">
    <div class="col-md-12">
      <label>Lütfen dosya seçiniz</label>
      <input multiple type="file" class="form-control" v-on:change="files = $event.target.files">
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-md-12 text-end">
      <button class="btn btn-primary" @click="saveImages">Resimleri Kaydet</button>
    </div>
  </div>

  <div class="row mt-5">
    <div class="col-md-2 mt-2" v-for="image in dataFiles">
      <div style="box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;">
        <img :src="image?.url" height="200" width="250">
      </div>
    </div>
  </div>
</template>

<script setup>
  import {computed, onMounted, ref} from "vue";
  import {mediaStore} from "@/store/media.js";

  const storeMedia = mediaStore();

  const files = ref([]);

  onMounted(() => {
    getFiles();
  });

  const getFiles = async () => {
    await storeMedia.getFiles();
  }

  const dataFiles = computed(() => {
    return storeMedia._files;
  });

  const saveImages = async () => {
    if(files.value.length == 0)
      return;

    let formData = new FormData();
    files.value.forEach(f => {
      formData.append('files',f);
    });

    await storeMedia.sendFiles(formData);
    await storeMedia.getFiles();
  }
</script>

<style scoped>

</style>
