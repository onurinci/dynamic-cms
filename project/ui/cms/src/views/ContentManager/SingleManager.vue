<template>
  <div class="row">
    <div v-for="(input,index) in data.pageData.controls" :key="index" :class="input?.className" class="mb-3">
      <div v-if="input?.field === 'InputText'">
        <Input
            :label="input?.label"
            :name="input?.name"
            :value="data.formValues[index].value"
            v-model="data.formValues[index].value"/>
      </div>
      <div v-if="input?.field === 'InputSelect' ">
        <Select
          :label="input?.label"
          :name="input?.name"
          :options="input?.options?.options"
          :value="data.formValues[index].value"
          v-model="data.formValues[index].value"/>
      </div>
      <div v-if="input?.field === 'InputCollection'">
        <Collection
            :label="input?.label"
            :name="input?.name"
            :value="data.formValues[index].value"
            v-model="data.formValues[index].value" />
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
      <button class="btn btn-success" @click="save">Kaydet</button>
    </div>
  </div>
</template>

<script setup>
  import {useRoute} from 'vue-router';
  import {onMounted, reactive, inject} from "vue";
  import axios from "axios";
  import Input from '@/components/ContentManager/Forms/Input.vue';
  import Select from '@/components/ContentManager/Forms/Select.vue';
  import Collection from '@/components/ContentManager/Forms/Collection.vue';
  import Media from '@/components/ContentManager/Forms/Media.vue';
  import {mediaStore} from "@/store/media.js";

  const route = useRoute();
  const storeMedia = mediaStore();

  const $vfm = inject("$vfm");

  const data = reactive({
    pageId: "",
    activeLocale: "",
    pageData: [],
    formValues: []
  });

  onMounted(async () => {
    data.pageId = route.params.id;
    data.activeLocale = route.params.locale;
    await getDetailsByPageId();
    await storeMedia.getFiles();
  });

  const getDetailsByPageId = async () => {
    data.pageData = (await axios.get(`http://172.17.20.174:3001/api/admin/page/${data.pageId}/${data.activeLocale}`)).data;
    data.pageData.controls?.forEach(f => {
      if(f.field === "InputImage"){
        data.formValues.push({
          'name': f.name,
          'value': data.pageData?.contents?.find(x => x.name == f.name )?.value || [], //
        });
      }
      if (f.field === "InputText") {
        data.formValues.push({
          'name' : f.name,
          'value': data.pageData?.contents?.find(x => x.name == f.name )?.value || "",
        });
      }
      if(f.field === 'InputCollection') {
        data.formValues.push({
          'name' : f.name,
          'value': data.pageData?.contents?.find(x => x.name == f.name )?.value || "",
        });
      }
      if(f.field === "InputVideo"){
        data.formValues.push({
          'name': f.name,
          'value': data.pageData?.contents?.find(x => x.name == f.name )?.value || [], //
        });
      }
      if(f.field === "InputSelect"){
        data.formValues.push({
          'name': f.name,
          'value': data.pageData?.contents?.find(x => x.name == f.name )?.value || [], //
        });
      }
    });
  }

  const save = async () => {
    const params = {
      name: data.activeLocale,
      contents: [...data.formValues]
    };
    const apiData = await axios.post(`http://172.17.20.174:3001/api/admin/page/${data.pageId}/content/save`, params);
    console.log(apiData);
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

</script>

<style scoped>

</style>
