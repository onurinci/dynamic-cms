<template>
  <div>
    <Input v-for="(input,index) in pageData.controls" :key="index" :label="input?.label" :name="input?.name" v-model="formValues[index].value"/>
    abc : {{ formValues }}
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import {onMounted, ref} from "vue";
  import axios from "axios";
  import Input from '@/components/Forms/Input.vue';


  const route = useRoute();

  const pageId = ref(null);
  const pageData = ref([]);
  const formValues = ref([]);

  onMounted(() => {
    pageId.value = route.params.id;
    getDetailsByPageId();
  });

  const getDetailsByPageId = async () => {
    const params = {
      id: pageId.value
    }

    pageData.value = (await axios.get('http://172.17.20.174:3001/api/builder/getPageById', {params})).data;

    pageData.value?.controls.forEach(f => {
      formValues.value.push({
        'name' : f.name,
        'value' : ''
      });
    });
  }



</script>

<style scoped>

</style>
