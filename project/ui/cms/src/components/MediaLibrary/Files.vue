<template>
  <div class="row mt-5">
    <div class="col-md-2 mt-2 clickDiv" v-for="(file, index) in files"  :key="file?.url">
      <div class="img-rep img" ref="images" @click="addImage($event, file?.filename, index)">
        <img :src="file?.url">
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";

  defineProps({
    files: Array
  });

  const emit = defineEmits(["selected-images"]);

  const images = ref([]);

  const data = reactive({
    selectedImages: []
  })

  const addImage = (event, imageName, index) => {

    /*var button = document.getElementById('button');
    button.querySelector('h3').addEventListener('click',function(){
      button.classList.toggle('open');
    });*/

    if(data.selectedImages.indexOf(imageName) === -1){
      data.selectedImages.push(imageName);
      images.value[index].classList.add('imgclick');
      //event.target.classList.add('imgclick');

    }
    else{
      const arr = data.selectedImages;
      if (!arr || arr.length < 1) {
        return;
      }
      arr.splice(arr.indexOf(name), 1);
      //event.target.classList.remove('imgclick');
      images.value[index].classList.remove('imgclick');
    }

    emit('selected-images',data.selectedImages);

  }


</script>

<style scoped>

  .img-rep {
    background-color: var(--bs-body-bg);
    border: 1px solid var(--bs-border-color);
    border-radius: 0.25rem;
    text-align: center;
    height: 220px;
    line-height: 220px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 10px;
  }

  .img-rep:hover {
    border: 2px dashed red !important;
    cursor: pointer;
  }

  .img-rep img {
    display: inline-block;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    vertical-align: unset !important;
  }

  img {

  }

  .imgclick {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }

  .imgclick < .col-md-2 {
     background: #000 !important;
    border: 3px solid red !important;
  }

</style>
