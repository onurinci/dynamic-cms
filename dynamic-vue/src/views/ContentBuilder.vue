<template>

  <div class="row">
    <div class="col-md-6">
      <label>Sayfa Adı</label>
      <input type="text" class="form-control" v-model="values.pageTitle">
    </div>
    <div class="col-md-12"></div><br>

    <div class="row" v-for="item in rowCount">
      <div class="col-md-4">
        <label>Başlığını Giriniz</label>
        <input type="text" class="form-control" v-on:keyup="values.controls[item-1].name = replaceChar($event.target.value)" v-model="values.controls[item-1].label">
      </div>
      <div class="col-md-4">
        <label>BS Class</label>
        <input type="text" class="form-control" v-model="values.controls[item-1].className">
      </div>
      <div class="col-md-4">
        <label>Alan Seçin</label>
        <select class="form-select" v-model="values.controls[item-1].field">
          <option value="text">Yazı Alanı</option>
          <option value="number">Sayı Alanı</option>
          <option value="email">Mail Alanı</option>
          <option value="longtext">İçerik Alanı</option>
          <option value="select">Seçim Alanı</option>
        </select>
      </div>
    </div>
  </div>

  <div class="row mt-2">
    <div class="col-md-6">
      <button class="btn btn-success" @click="addToValues">Artır</button>
    </div>
    <div class="col-md-6 text-end">
      <button class="btn btn-danger" @click="send">Kaydet</button>
    </div>
  </div>
  {{ values }}

<!--  <div v-for="item in json" :key="item?.key">-->
<!--    <div v-if="item?.type == 'input' && item?.type_detail == 'text'">-->
<!--      <input type="text" :placeholder="item?.templateOptions?.placeholder" required="{{ item?.templateOptions?.required }}" v-model="data[item?.key]">-->
<!--    </div>-->
<!--    <div v-if="item?.type == 'input' && item?.type_detail == 'number'">-->
<!--      <input type="number" :placeholder="item?.templateOptions?.placeholder" required="{{ item?.templateOptions?.required }}" v-model="data[item?.key]">-->
<!--    </div>-->
<!--    <div v-if="item?.type == 'input' && item?.type_detail == 'email'">-->
<!--      <input type="email" :placeholder="item?.templateOptions?.placeholder" required="{{ item?.templateOptions?.required }}" v-model="data[item?.key]">-->
<!--    </div>-->
<!--    <div v-if="item?.type == 'select'">-->
<!--      <select v-model="data[item?.key]">-->
<!--        <option v-for="opt in item?.templateOptions?.options" :value="opt?.value">{{ opt?.text }}</option>-->
<!--      </select>-->
<!--    </div>-->
<!--  </div>-->

<!--  <button @click="send"> Tıkla ve Gönder</button>-->

</template>

<script setup>
  import {reactive, ref} from "vue";
  import axios from 'axios';
  import {replaceChar} from "@/utils/helper.js";

  const rowCount = ref(1);
  const values = reactive({
    pageTitle: "",
    controls: [
      {
        label: "",
        name: "",
        field: "",
        className: ""
      }
    ]
  });

  // Functions
  const addToValues = () => {
    rowCount.value++;
    values.controls.push({
      label: "",
      name: "",
      field: "",
      className: ""
    });
  };

  const send = async () => {
    await axios.post('http://172.17.20.174:3001/createPage', values).then(resp => {
      console.log(resp?.data);
    });
  }
</script>

<style scoped>

</style>
