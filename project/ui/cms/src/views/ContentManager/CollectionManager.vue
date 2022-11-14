<template>

  <div class="row mb-3">
    <div class="col-md-12 text-end ">
      <router-link :to="`/contentmanager/collectionType/${data.pageId}/${data.activeLocale}/new`">
        <button class="btn btn-primary" >Yeni İçerik Ekleyin</button>
      </router-link>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-for="data in data.pageData?.controls"> {{ data?.label }} </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in data.pageData.contents">
              <td v-for="data in content?.data"> {{ data?.value }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {onMounted, reactive, ref} from "vue";
  import {useRoute} from "vue-router";
  import axios from "axios";

  // İnitialize
  const route = useRoute();

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
