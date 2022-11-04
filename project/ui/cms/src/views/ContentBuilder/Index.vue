<template>
  <div class="row">
    <div class="col-md-6">
      <label>Sayfa Adı</label>
      <input type="text" class="form-control" placeholder="Hakkımızda..." v-model="formValues.pageTitle">
    </div>
    <div class="col-md-6">
      <label>Sayfa Tipi</label>
      <select class="form-select" v-model="formValues.pageType">
        <option value="0" selected disabled>Sayfa Tipi Seçin..</option>
        <option value="1">Tekli Sayfa</option>
        <option value="2">Liste Sayfası</option>
      </select>
    </div>
  </div>

  <div class="row mt-2" :key="item" v-for="item in data.rowCount">
    <div class="col-md-4">
      <label>Başlığını Giriniz</label>
      <input type="text" class="form-control" v-on:keyup="formValues.controls[item-1].name = replaceChar($event.target.value)" v-model="formValues.controls[item-1].label">
    </div>
    <div class="col-md-4">
      <label>BS Class</label>
      <input type="text" class="form-control" v-model="formValues.controls[item-1].className">
    </div>
    <div class="col-md-4">
      <label>Alan Seçin</label>
      <select class="form-select" v-model="formValues.controls[item-1].field" @change="modalAc">
        <option value="InputText">Yazı Alanı</option>
        <option value="number">Sayı Alanı</option>
        <option value="email">Mail Alanı</option>
        <option value="longtext">İçerik Alanı</option>
        <option value="select">Seçim Alanı</option>
      </select>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-md-6 text-start">
      <button class="btn btn-primary" @click="addToValues">Alan Ekle</button>
    </div>
    <div class="col-md-6 text-end">
      <button class="btn btn-success">Oluştur</button>
    </div>
  </div>

    <component :is="tabs[0]"></component>

  {{ formValues }}

  {{ data.selectedType }}
  aaa {{ tabs[0] }} ggg

  <vue-final-modal v-model="show" classes="modal-container" content-class="modal-content">
    <button class="modal__close" @click="show = false">
      <i class="material-icons has-sub-menu">close</i>
    </button>
    <span class="modal__title">{{ formValues.pageTitle }}</span>
    <hr>
    <div class="modal__content">



    </div>
  </vue-final-modal>

</template>

<script setup>
  import {inject, ref, reactive} from "vue";
  import {replaceChar} from '@/utils/helper.js';
  import InputText from '@/components/ContentBuilder/InputText.vue';

  const tabs = [
    InputText
  ]

  // inject
  const $vfm = inject('$vfm');
  const show = ref(false);
  const selectedType = ref("InputText");

  // data
  const data = reactive({
    rowCount: 1,
    selectedType: "InputText",
  })

  const formValues = reactive({
    pageType : "0",
    pageTitle: "",
    controls: [
      {
        label: "",
        name: "",
        field: "",
        className: "",
        options: []
      }
    ]
  });

  // functions
  const addToValues = () => {
    data.rowCount++;
    formValues.controls.push({
      label: "",
      name: "",
      field: "",
      className: "",
      options: []
    });
  };


  const modalAc = () => {
    show.value = true;
    selectedType.value = 'InputText'
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
