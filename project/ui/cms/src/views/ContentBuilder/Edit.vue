<template>
  <div class="row mt-2" :key="item" v-for="item in data.pageData?.controls">
    <div class="col-md-4">
      <label>Başlığını Giriniz</label>
      <input type="text" class="form-control" :value="item?.label" disabled>
    </div>
    <div class="col-md-4">
      <label>BS Class</label>
      <input type="text" class="form-control" :value="item?.className" disabled>
    </div>
    <div class="col-md-4">
      <label>Alan Seçin</label>
      <div class="input-group">
        <select class="form-control" :value="item?.field" disabled>
          <option value="InputText">Yazı Alanı</option>
          <option value="InputSelect">Seçim Alanı</option>
          <option value="InputImage">Resim Alanı</option>
          <option value="InputVideo">Video Alanı</option>
          <option value="InputCollection">Liste Alanı</option>
          <option value="InputTextarea">İçerik Alanı</option>
        </select>
        <button class="btn btn-danger ms-2" @click="deleteField(item?._id)">Alanı Sil</button>
      </div>
    </div>
  </div>

  <div class="row mt-2">
    <div class="col-md-4">
      <label>Başlığını Giriniz</label>
      <input type="text" class="form-control" v-on:keyup="formValues.name = replaceChar($event.target.value)" v-model="formValues.label">
    </div>
    <div class="col-md-4">
      <label>BS Class</label>
      <input type="text" class="form-control" v-model="formValues.className">
    </div>
    <div class="col-md-4">
      <label>Alan Seçin</label>
      <div class="input-group">
        <select class="form-select" v-model="formValues.field" @change="openModal">
          <option value="InputText">Yazı Alanı</option>
          <option value="InputSelect">Seçim Alanı</option>
          <option value="InputImage">Resim Alanı</option>
          <option value="InputVideo">Video Alanı</option>
          <option value="InputCollection">Liste Alanı</option>
          <option value="InputTextarea">İçerik Alanı</option>
        </select>
        <button class="btn btn-success ms-2" @click="addField">Kaydet</button>
      </div>
    </div>
  </div>


  <vue-final-modal v-model="show" classes="modal-container" content-class="modal-content">
    <button class="modal__close" @click="show = false">
      <i class="material-icons has-sub-menu">close</i>
    </button>
    <span class="modal__title">{{ formValues.pageTitle }}</span>
    <hr>
    <div class="modal__content">
      <keep-alive>
        <component @options="getOptions" :is="data.selectedType"></component>
      </keep-alive>
    </div>
  </vue-final-modal>

</template>
<script setup>
  import { useRoute } from "vue-router";
  import {onMounted, reactive, ref} from "vue";
  import { replaceChar } from "@/utils/helper.js";
  import axios from "axios";

  onMounted(() => {
    data.pageId = route.params.id;
    getDataByPageId();
  });

  const route = useRoute();

  const show = ref(false);
  const data = reactive({
    pageId: "",
    pageData: [],
    selectedType: "InputText",
  });

  const getOptions = (options) => {
    formValues.options = options;
  }

  const formValues = reactive({
    label: "",
    name: "",
    field: "",
    className: "",
    options: {}
  })

  const getDataByPageId = async () => {
    data.pageData = (await axios.get(`http://172.17.20.174:3001/api/admin/page/${data.pageId}`)).data;
    console.log(data.pageData);
  }

  const deleteField = async (fieldId) => {
    const param = {
      pageId: data.pageId,
      controlId: fieldId
    }
    await axios.post(`http://172.17.20.174:3001/api/admin/page/${data.pageId}/deleteBuilderControl`, param);
    await getDataByPageId();
  }

  const openModal = (event) => {
    show.value = true;
    data.selectedType = event.target.value;
  };

  const addField = async () => {
    await axios.post(`http://172.17.20.174:3001/api/admin/page/${data.pageId}/createControl`, formValues);
    await getDataByPageId();
    formValues.field = "";
    formValues.label = "";
    formValues.name = "";
    formValues.className = "";
    formValues.options = {};
  }

</script>

<style scoped>
  :deep(.vfm--fixed) {
    z-index: 20000;
  }
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
    /*overflow-y: auto;
    overflow-x: hidden;*/
    padding: 0 10px 0 10px;
  }
  .modal__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
</style>
