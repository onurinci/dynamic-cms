<template>

  <vue-final-modal v-slot="{ close }" name="createUserModal" classes="modal-container" content-class="modal-content">
    <button class="modal__close" @click="close">
      <i class="material-icons has-sub-menu">close</i>
    </button>
    <span class="modal__title">Media Seç</span>
    <hr>
    <div class="modal__content">
      <FileUpload/>
      <Files @selected-images="getSelectedImages"  :files="dataFiles"/>
      <div class="row">
        <div class="col-md-12 text-end">
          <button class="btn btn-success" @click="returnSelectedImages(close)">Seçimleri Kaydet</button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script setup>
  import FileUpload from '@/components/MediaLibrary/FileUpload.vue';
  import Files from '@/components/MediaLibrary/Files.vue';
  import {mediaStore} from "@/store/media.js";
  import {computed, ref} from "vue";

  const storeMedia = mediaStore();

  const emit = defineEmits(['selectedImages']);

  const selectedImages = ref([]);

  const dataFiles = computed(() => {
    return storeMedia._files;
  });

  const getSelectedImages = (data) => {
    selectedImages.value = data;
  }

  const returnSelectedImages = (close) => {
    emit('selectedImages', { images: selectedImages.value , close });
  }
</script>

<style scoped>
  :deep(.modal-container){
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 70%;
    margin:0 auto;
  }

  :deep(.modal-content) {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 90%;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
  }

  .modal__title {
    margin: 0 2rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .modal__content {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 10px 0 10px;
  }

  .modal__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
</style>
