<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">

    <div data-simplebar="" class="h-100">

      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu">
          <li class="menu-title" data-key="t-menu">Menu</li>

          <li>
            <router-link to="/">
              <i data-feather="home"></i>
              <span data-key="t-dashboard">Anasayfa</span>
            </router-link>
          </li>

          <li>
            <router-link to="/contentBuilder">
              <i data-feather="file-plus"></i>
              <span data-key="t-dashboard">Content Builder</span>
            </router-link>
          </li>

          <li>
            <router-link to="/mediaLibrary">
              <i data-feather="image"></i>
              <span data-key="t-dashboard">Görsel Kütüphanesi</span>
            </router-link>
          </li>

          <li>
            <a href="javascript: void(0);" class="has-arrow">
              <i data-feather="layout"></i>
              <span data-key="t-multi-level">Sayfalar</span>
            </a>
            <ul class="sub-menu" aria-expanded="true">
              <li>
                <a href="javascript: void(0);" class="has-arrow" data-key="t-level-1-2">Tekli Sayfalar</a>
                <ul class="sub-menu" aria-expanded="true">
                  <li v-for="page in singleTypePages">
                    <router-link :to="`/contentmanager/${page?.pageType}/${page?._id}/${defaultLocale}`">
                      {{ page?.pageTitle }}
                    </router-link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript: void(0);" class="has-arrow" data-key="t-level-1-2">Liste Sayfaları</a>
                <ul class="sub-menu" aria-expanded="true">
                  <li v-for="page in collectionTypePages">
                    <router-link :to="`/contentmanager/${page?.pageType}/${page?._id}/${defaultLocale}`">
                      {{ page?.pageTitle }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="menu-title" data-key="t-menu">Ayarlar</li>

          <li>
            <router-link to="/settings/internationalization">
              <i data-feather="globe"></i>
              <span data-key="t-dashboard">Dil Desteği</span>
            </router-link>
          </li>

        </ul>
      </div>
      <!-- Sidebar -->
    </div>
  </div>
  <!-- Left Sidebar End -->
</template>

<script setup>
  import axios from "axios";
  import {computed, onMounted, ref} from "vue";
  import {pageStore} from "@/store/page.js";
  import {internationalizationStore} from "@/store/internationalization.js";

  const storePage = pageStore();
  const storeInternationalization = internationalizationStore();

  const defaultLocale = ref("");

  onMounted(async () => {
    await storePage.getSingleTypePages();
    await storePage.getCollectionTypePages();
    await storeInternationalization.getLocales();
    getDefaultLocale()
  });

  const singleTypePages = computed(() => {
    return storePage._singleTypePages;
  });

  const collectionTypePages = computed(() => {
    return storePage._collectionTypePages;
  });

  const locales = computed(() => {
    return storeInternationalization._locales;
  });

  const getDefaultLocale = () => {
    defaultLocale.value = locales.value.find(f => f.isDefault === true)?.locale
  };

</script>

<style scoped>

</style>
