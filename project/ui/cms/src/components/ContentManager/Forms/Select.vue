<template>
  <div>
    <label>{{ label }}</label>
    <select
        class="form-select"
        :name="name"
        v-model="value"
        @input="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in selectOptions" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script setup>
  import {onMounted, ref} from "vue";

  onMounted(() => {
    splitOptions();
  })

  const props  = defineProps({
    label: String,
    name: String,
    value: String,
    options: String
  });

  const selectOptions = ref([]);

  const splitOptions = () => {
    selectOptions.value = props.options.toString().split("\n");
  }

</script>
