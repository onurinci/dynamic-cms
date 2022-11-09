<template>
  <div>
    <label>{{ label }}</label>
    <select
        class="form-select"
        :name="name"
        v-model="value"
        @input="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="collection in collections" :key="collection?._id" :value="collection?._id">{{ collection?.pageTitle }}</option>
    </select>
  </div>
</template>

<script setup>
  import {computed} from "vue";
  import {pageStore} from "@/store/page.js";

  const storePage = pageStore();

  defineProps({
    label: String,
    name: String,
    value: String,
  });

  const collections = computed(() => {
    return storePage._collectionTypePages;
  })

</script>
