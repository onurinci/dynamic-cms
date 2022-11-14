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
              <th>Varsayılan</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="locale in locales">
              <td>{{ locale?.name }}</td>
              <td>{{ locale?.locale }}</td>
              <td>
                <span v-if="locale?.isDefault"><i data-feather="check"></i></span>
                <span v-if="!locale?.isDefault"><i data-feather="x"></i></span>
              </td>
              <td>
                <button v-if="!locale?.isDefault" class="btn btn-sm btn-warning" @click="setAsDefault(locale?._id)">Varsayılan yap</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <vue-final-modal v-model="show" classes="modal-container" content-class="modal-content">
    <button class="modal__close" @click="show = false" style="border: none !important;">
      <button class="btn btn-soft-dark waves-effect waves-light">
        <i data-feather="x-square"></i>
      </button>
    </button>
    <span class="modal__title">Yeni Dil Ekle</span>
    <hr>
    <div class="modal__content">
      <div class="row">
        <div class="col-md-5">
          <label>Dil Açıklaması</label>
          <input type="text" class="form-control" placeholder="Türkçe..." v-model="languageFields.name">
        </div>
        <div class="col-md-4">
          <label>Dil Kısaltması</label>
          <input type="text" class="form-control" placeholder="tr..." v-model="languageFields.locale">
        </div>
        <div class="col-md-3 mt-4">
          <div class="form-check form-switch form-switch-lg">
            <input type="checkbox" class="form-check-input" id="isDefaultCheck" v-model="languageFields.isDefault">
            <label class="form-check-label" for="isDefaultCheck">Varsayılan olarak ayarla</label>
          </div>
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
  import {inject, ref, reactive, onMounted, computed} from "vue";
  import {internationalizationStore} from "@/store/internationalization.js";

  const storeInternationalization = internationalizationStore();

  // inject
  const $vfm = inject('$vfm');

  // variables
  const show = ref(false);
  const languageFields = reactive({
    name: '',
    locale: '',
    isDefault: false,
  });

  //functions
  const saveLanguage = async () => {
    if(languageFields.name == null || languageFields.locale == null){
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    try {
      await storeInternationalization.saveLocale(languageFields);
      await storeInternationalization.getLocales();
      alert("Kaydedildi");
    } catch (e) {
      alert("Kaydedilirken hata oluştu");
    }
  }

  const locales = computed(() => {
    return storeInternationalization._locales;
  });

  const setAsDefault = async (id) => {
    try {
      await storeInternationalization.changeDefaultLang({ id });
      await storeInternationalization.getLocales();
      alert("Varsayılan dil değiştirildi");
    } catch (e) {
      alert("Bilinmeyen hata oluştu");
    }
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
