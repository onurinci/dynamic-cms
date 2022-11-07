<template>
  <div class="row">
    <div class="col-md-12 text-end">
      <button class="btn btn-secondary" @click="show = true">Yeni Dil Ekle</button>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Açıklama</th>
              <th>Kısaltma</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="language in languages">
              <td>{{ language?.name }}</td>
              <td>{{ language?.locale }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <vue-final-modal v-model="show" classes="modal-container" content-class="modal-content">
    <button class="modal__close" @click="show = false">
      <i class="material-icons has-sub-menu">close</i>
    </button>
    <span class="modal__title">Yeni Dil Ekle</span>
    <hr>
    <div class="modal__content">
      <div class="row">
        <div class="col-md-6">
          <label>Dil Açıklaması</label>
          <input type="text" class="form-control" placeholder="Türkçe..." v-model="languageFields.name">
        </div>
        <div class="col-md-6">
          <label>Dil Kısaltması</label>
          <input type="text" class="form-control" placeholder="tr..." v-model="languageFields.locale">
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12">
          <button class="btn btn-success" @click="saveLanguage">Kaydet</button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script setup>
import {inject, ref, reactive, onMounted} from "vue";
  import axios from 'axios';

  onMounted(async () => {
    await getLanguage()
  })

  // inject
  const $vfm = inject('$vfm');

  // variables
  const show = ref(false);
  const languages = ref([]);
  const languageFields = reactive({
    name: '',
    locale: ''
  });

  //functions
  const saveLanguage = async () => {
    if(languageFields.name == null || languageFields.locale == null){
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    const data = (await axios.post('http://172.17.20.174:3001/api/admin/internationalization', languageFields)).data
    console.log(data);
  }

  const getLanguage = async () => {
    languages.value = (await axios.get('http://172.17.20.174:3001/api/admin/internationalization')).data
    console.log(languages.value)
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
