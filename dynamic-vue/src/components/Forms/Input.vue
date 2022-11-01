<template>
  <div>
    <label>{{ label }}</label>
    <input :type="field" :name="name" class="form-control" v-model="value" @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const value = ref("");

  defineProps({
    label: String,
    field: String,
    name: String,
  });

</script>
