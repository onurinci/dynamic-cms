<template>
  <div class="row">
    <div class="col-md-4">
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="required" v-model="formFields.required">
        <label class="form-check-label" for="required">
          Zorunlu mu ?
        </label>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="multiple" v-model="formFields.multiple">
        <label class="form-check-label" for="multiple">
          Birden Fazla Resim Kabul Edilsin mi ?
        </label>
      </div>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-md-12 text-end">
      <button class="btn btn-primary" @click="$emit('options',formFields)">Ayarları Kaydet</button>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
defineEmits(["options"]);

const formFields = reactive({
  required: false,
  multiple: false,
});
</script>

<style scoped>

</style>
