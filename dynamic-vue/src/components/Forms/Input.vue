<template>
  <div>
    <label>{{ label }}</label>
    <input
        class="form-control"
        :type="field"
        :name="name"
        v-model="value"
        @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup>
  defineProps({
    label: String,
    field: String,
    name: String,
    value: String
  });

</script>
