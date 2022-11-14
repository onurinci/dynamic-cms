<template>
  <router-view></router-view>
  <div>
    <ModalsContainer></ModalsContainer>
  </div>
</template>

<script setup>
  import { loadScript } from "vue-plugin-load-script";
  import {onMounted} from "vue";
  import {ModalsContainer} from "vue-final-modal";

  let scripts = [
    "bootstrap.bundle.min.js",
    "metisMenu.min.js",
    "simplebar.min.js",
    "waves.min.js",
    "feather.min.js",
    "pace.min.js",
    "app.js"
  ];

  onMounted(async () => {
    setTimeout( async() => {
      await loadScriptNav(`/src/assets/js/jquery.min.js`);
      scripts.forEach(e => {
        (async () => {
          await loadScriptNav(`/src/assets/js/${e}`)
        })()
      });
    }, 2000);
  });

  const loadScriptNav = async (path) => {
    try {
      await loadScript(path);
    }
    catch (e) { }
  }

</script>
