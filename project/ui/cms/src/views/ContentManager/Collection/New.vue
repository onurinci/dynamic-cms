<template>
  <div class="row">
    <div class="col-md-3 offset-9">
      <label>Dil Seçin</label>
      <select class="form-control" @change="router.push({ path: `/contentmanager/collectionType/${data.pageId}/${$event.target.value}/new` })">
        <option value="tr" >Türkçe</option>
        <option value="en" >İngilizce</option>
      </select>
    </div>
  </div>

  <div class="row">
    <div v-for="(input,index) in data.pageData.controls" :key="index" :class="input?.className" class="mb-3">
      <div v-if="input?.field === 'InputText' || input?.field === 'InputVideo' ">
        <Input
            :label="input?.label"
            :name="input?.name"
            :value="data.formValues[index].value"
            v-model="data.formValues[index].value"/>
      </div>
      <div v-if="input?.field === 'InputTextarea'">
        <Textarea
            :label="input?.label"
            :value="data.formValues[index].value"
            @get-content="(n) => data.formValues[index].value = n " />
      </div>
      <div v-if="input?.field === 'InputSelect' ">
        <Select
            :label="input?.label"
            :name="input?.name"
            :options="input?.options?.options"
            :value="data.formValues[index].value"
            v-model="data.formValues[index].value"/>
      </div>
      <div v-if="input?.field === 'InputImage' "> <!-- InputImage -->
        <div class="mb-2">
          {{ input?.label }}
        </div>
        <div>
          <button class="btn btn-primary" @click="openMediaModal(index)">Media Seçin...</button>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="fileManager">
              <div class="fileCon" v-for="file in data.formValues[index].value">
                <button @click="removeImage(index,file)">x</button>
                <img alt="image" :src=" `http://172.17.20.174:3001/uploads/media/${file}` " />
              </div>
              <div class="clearfix"></div>
            </div>
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

</template>

<script setup>
  import {computed, inject, onMounted, reactive, ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import {mediaStore} from "@/store/media.js";
  import axios from "axios";
  import alertService from "@/utils/AlertService.js";
  import Input from "@/components/ContentManager/Forms/Input.vue";
  import Select from "@/components/ContentManager/Forms/Select.vue";
  import Media from '@/components/ContentManager/Forms/Media.vue';
  import Textarea from "@/components/ContentManager/Forms/Textarea.vue";

  const $vfm = inject("$vfm");

  // İnitialize
  const route = useRoute();
  const router = useRouter();
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

    try {
      data.pageData = (await axios.get(`http://172.17.20.174:3001/api/admin/collection/${data.pageId}/${data.activeLocale}`)).data;
    } catch (e) {
      alertService.failure('Verileri çekerken hata oluştu');
    }

    data.pageData.controls?.forEach(f => {
      if(f.field === "InputImage"){
        data.formValues.push({
          'name': f.name,
          'value': data.pageData?.contents?.find(x => x.name === f.name )?.value || [],
        });
      }
      if (f.field === "InputText") {
        data.formValues.push({
          'name' : f.name,
          'value': data.pageData?.contents?.find(x => x.name === f.name )?.value || "",
        });
      }
      if(f.field === 'InputCollection') {
        data.formValues.push({
          'name' : f.name,
          'value': data.pageData?.contents?.find(x => x.name === f.name )?.value || "",
        });
      }
      if(f.field === "InputVideo"){
        data.formValues.push({
          'name': f.name,
          'value': data.pageData?.contents?.find(x => x.name === f.name )?.value || "",
        });
      }
      if(f.field === "InputSelect"){
        data.formValues.push({
          'name': f.name,
          'value': data.pageData?.contents?.find(x => x.name === f.name )?.value || "",
        });
      }
      if(f.field === "InputTextarea"){
        data.formValues.push({
          'name': f.name,
          'value': data.pageData?.contents?.find(x => x.name === f.name )?.value || "",
        });
      }
    });
  }

  const openMediaModal = (index) => {
    $vfm.show({
      component: Media,
      on: {
        async selectedImages(args){
          data.formValues[index].value = args.images;
          args.close(); // modal'ı kapatır.
        }
      }
    });
  }

  const removeImage = (index,file) => {
    const arr = data.formValues[index].value;
    arr.splice(arr.indexOf(file), 1);
  }

  const save = async () => {
    const params = {
      name: data.activeLocale,
      data: data.formValues,
    };
    const apiData = (await axios.post(`http://172.17.20.174:3001/api/admin/collection/${data.pageId}/content/addItem`, params)).data;
  }

</script>
