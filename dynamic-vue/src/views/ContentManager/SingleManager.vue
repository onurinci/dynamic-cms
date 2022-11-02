<template>
  <div class="row">
    <div v-for="(input,index) in data.pageData.controls" :key="index" :class="input?.className" class="mb-3">
      <Input :label="input?.label" :name="input?.name" v-model="data.formValues[index].value"/>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12 text-end">
      <button class="btn btn-success" @click="save">Kaydet</button>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import {onMounted, reactive} from "vue";
import axios from "axios";
import Input from '@/components/Forms/Input.vue';
const route = useRoute();
const data = reactive({
  pageId: "",
  pageData: [],
  formValues: []
});
onMounted(() => {
  data.pageId = route.params.id;
  getDetailsByPageId();
});
const getDetailsByPageId = async () => {
  const params = {
    id: data.pageId
  }
  data.pageData = (await axios.get('http://172.17.20.174:3001/api/builder/getPageById', {params})).data;
  data.pageData.controls.forEach(f => {
    data.formValues.push({
      'name' : f.name,
      'value' : ''
    });
  });
}
const save = async () => {
  const params = {
    pageId : data.pageId,
    contents : [...data.formValues]
  }
  const apiData = await axios.post('http://172.17.20.174:3001/api/content/singleType/save', params)
  console.log(apiData);
}
</script>