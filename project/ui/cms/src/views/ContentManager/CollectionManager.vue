<template>

  <div class="row mb-3">
    <div class="col-md-9">
      <router-link :to="`/contentmanager/collectionType/${data.pageId}/${data.activeLocale}/new`">
        <button class="btn btn-primary" >Yeni İçerik Ekleyin</button>
      </router-link>
    </div>
    <div class="col-md-3">
      <label>Dil Seçin</label>
      <select class="form-control" :value="data.activeLocale" @change="router.push({ path: `/contentmanager/collectionType/${data.pageId}/${$event.target.value}` })">
        <option value="tr" >Türkçe</option>
        <option value="en" >İngilizce</option>
      </select>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="alert alert-warning" v-if=" data.pageData.contents?.length < 1">
        Kayıt bulunamadı
      </div>
      <div class="table-responsive" v-if=" data.pageData.contents?.length > 0">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-for="data in data.pageData?.controls"> {{ data?.label }} </th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in data.pageData.contents">
              <td v-for="data in content?.data"> {{ data?.value }} </td>
              <td>
                <div class="d-flex">
                  <router-link class="btn btn-sm btn-success me-2" :to=" `/contentmanager/collectionType/${data.pageId}/${data.activeLocale}/${content?._id}/edit` ">
                    Düzenle
                  </router-link>
                  <button class="btn btn-sm btn-danger">Sil</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {onMounted, reactive, ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import axios from "axios";

  // İnitialize
  const route = useRoute();
  const router = useRouter();

  // Variables
  const data = reactive({
    pageId: "",
    activeLocale: "",
    pageData: [],
    formValues: [],
  });

  onMounted(async () => {
    data.pageId = route.params.id;
    data.activeLocale = route.params.locale;
    await getDetailsByPageId()
  });

  const getDetailsByPageId = async () => {
    data.pageData = (await axios.get(`http://172.17.20.174:3001/api/admin/collection/${data.pageId}/${data.activeLocale}`)).data;
    console.log(data.pageData);
  }

</script>

<style scoped>

</style>
