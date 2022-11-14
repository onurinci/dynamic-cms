<template>
  <div class="row mt-5">
    <div class="col-md-2 mt-2 img" v-for="file in files" :key="file?.url">
      <img :src="file?.url" class="img-thumbnail" @click="addImage($event, file?.filename)">
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";

  defineProps({
    files: Array
  });

  const data = reactive({
    selectedImages: []
  })

  const addImage = (event, imageName) => {

    if(data.selectedImages.indexOf(imageName) === -1){
      data.selectedImages.push(imageName);
      event.target.classList.add('imgclick');
    }
    else{
      const arr = data.selectedImages;
      if (!arr || arr.length < 1) {
        return;
      }
      arr.splice(arr.indexOf(name), 1);
      event.target.classList.remove('imgclick');
    }

  }


</script>

<style scoped>

  img {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  img:hover {
    border: 2px dashed red;
    cursor: pointer;
  }

  .imgclick {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
</style>
