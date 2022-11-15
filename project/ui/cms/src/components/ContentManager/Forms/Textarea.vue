<template>
  <label>{{ label }}</label>
  <QuillEditor
      theme="snow"
      toolbar="full"
      v-model:content="value"
      ref="editor"
      @update:content="sendHTML" />
</template>

<script setup>
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import {onMounted, ref} from "vue";

  const emit = defineEmits(["get-content"]);
  const editor = ref();

  onMounted(() => {
    editor.value.setHTML(props.value);
  })

  const props = defineProps({
    label: String,
    value: String
  });

  const sendHTML = () => {
    emit('get-content',editor.value.getHTML());
  }




</script>

<style scoped>

</style>
