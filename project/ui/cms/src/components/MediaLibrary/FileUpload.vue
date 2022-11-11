<template>
  <div class="row">
    <div class="col-md-12">
<!--      <input multiple type="file" class="form-control" v-on:change="files = $event.target.files">-->
      <file-pond
          name="test"
          ref="pond"
          label-idle="Dosyaları buraya sürükleyin veya seçin..."
          v-bind:allow-multiple="true"
          credits="false"
          allowImageEdit="true"
      />
    </div>
  </div>
  <div class="row mt-1">
    <div class="col-md-12 text-end">
      <button class="btn btn-primary" @click="saveImages">Resimleri Kaydet</button>
    </div>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {mediaStore} from "@/store/media.js";

  import vueFilePond from "vue-filepond";
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";

  defineEmits(["get-files"]);

  const storeMedia = mediaStore();

  const FilePond = vueFilePond(
      FilePondPluginFileValidateType,
      FilePondPluginImagePreview,
  );

  const files = ref([]);
  const pond = ref(null);

  const saveImages = async () => {
    if(pond.value.getFiles().length < 1)
      return;

    let formData = new FormData();
    pond.value.getFiles().forEach(f => {
      formData.append('files',f.source);
    });

    pond.value.removeFiles();
    await storeMedia.sendFiles(formData);
    await storeMedia.getFiles();
  }


</script>

<style src="filepond/dist/filepond.min.css"></style>
<style src="filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"></style>
<style scoped>

</style>
