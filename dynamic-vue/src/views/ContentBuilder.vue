<template>

  <div class="row">
    <div class="col-md-6">
      <label>Sayfa Adı</label>
      <input type="text" class="form-control" v-model="values.pageTitle">
    </div>
    <div class="col-md-6">
      <label>Sayfa Tipi</label>
      <select class="form-select" v-model="values.pageType">
        <option value="0" disabled>Sayfa Tipi Seçin...</option>
        <option value="singleType">Tekli Sayfa</option>
        <option value="collectionType">Liste Sayfası</option>
      </select>
    </div>
  </div>

  <div class="row mt-2" :key="item.name" v-for="item in rowCount">
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

  <div class="row mt-2">
    <div class="col-md-6">
      <button class="btn btn-success" @click="addToValues">Artır</button>
    </div>
    <div class="col-md-6 text-end">
      <button class="btn btn-danger" @click="send">Kaydet</button>
    </div>
  </div>
  {{ values }}

</template>

<script setup>
  import {reactive, ref} from "vue";
  import axios from 'axios';
  import {replaceChar} from "@/utils/helper.js";
  const rowCount = ref(1);

  const values = reactive({
    pageType : "0",
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
    const response = await axios.post('http://172.17.20.174:3001/api/builder/createPage', values);
    console.log(response);
  }
</script>

<style scoped>
</style>
