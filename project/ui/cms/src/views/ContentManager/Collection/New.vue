<template>
  <div class="row">
    <div v-for="(input,index) in data.pageData.controls" :key="index" :class="input?.className" class="mb-3">
      <div v-if="input?.field === 'InputText'">
        <Input
            :label="input?.label"
            :name="input?.name"
            v-model="data.formValues[index].value"/>
      </div>
      <div v-if="input?.field === 'InputSelect'">
        <Select
            :label="input?.label"
            :name="input?.name"
            :options="input?.options?.options"
            v-model="data.formValues[index].value"/>
      </div>
      <div v-if="input?.field === 'InputImage' "> <!-- InputImage -->
        <div class="fileManager">
          <div class="fileCon" v-for="file in files">
            <div class="chk"><input type="checkbox" @change="getSelectedFiles($event, file?.filename, index)" /></div>
            <img :src="file?.url" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12 text-end">
      <button class="btn btn-info" @click="save">Kaydet</button>
    </div>
  </div>

  {{ data.formValues }}
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
  import {useRoute} from "vue-router";
  import axios from "axios";
  import Input from "@/components/ContentManager/Forms/Input.vue";
  import Select from "@/components/ContentManager/Forms/Select.vue";
  import File from "@/components/ContentManager/Forms/File.vue";
  import {mediaStore} from "@/store/media.js";

  // İnitialize
  const route = useRoute();
  const storeMedia = mediaStore();

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
    await getDetailsByPageId();
    await storeMedia.getFiles();
  });

  const getDetailsByPageId = async () => {
    data.pageData = (await axios.get(`http://172.17.20.174:3001/api/admin/page/${data.pageId}/${data.activeLocale}`)).data;

    data.pageData.controls.forEach(f => {
      if(f.field === "InputImage"){
        data.formValues.push({
          'name': f.name,
          'value': [],
        });
      }
      if (f.field === "InputText") {
        data.formValues.push({
          'name' : f.name,
          'value': "" ,
        });
      }
    });
  }

  const getSelectedFiles = (event,name,index) => {
    if(event.target.checked){
      data.formValues[index].value.push(name);
      console.log("checked values", data.formValues[index].value);
    }
    else{
      const arr = data.formValues[index].value;
      if (!arr || arr.length < 1) {
        return;
      }
      arr.splice(arr.indexOf(name), 1);
    }
  }

  const files = computed(() => {
    return storeMedia._files;
  });

  const save = async () => {
    const params = {
      name: data.activeLocale,
      item: data.formValues,
    };
    const apiData = (await axios.post(`http://172.17.20.174:3001/api/admin/page/${data.pageId}/content/addItem`, params)).data;
    console.log(apiData);
  }

</script>
