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

          <li>
            <a href="javascript: void(0);" class="has-arrow">
              <i data-feather="grid"></i>
              <span data-key="t-apps">Menü Tasarla</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
              <li>
                <a href="apps-calendar.html">
                  <span data-key="t-calendar">Calendar</span>
                </a>
              </li>

              <li>
                <a href="apps-chat.html">
                  <span data-key="t-chat">Chat</span>
                </a>
              </li>

              <li>
                <a href="javascript: void(0);" class="has-arrow">
                  <span data-key="t-email">Email</span>
                </a>
                <ul class="sub-menu" aria-expanded="false">
                  <li><a href="apps-email-inbox.html" data-key="t-inbox">Inbox</a></li>
                  <li><a href="apps-email-read.html" data-key="t-read-email">Read Email</a></li>
                </ul>
              </li>
              <li>
                <a href="javascript: void(0);" class="has-arrow">
                  <span data-key="t-invoices">Invoices</span>
                </a>
                <ul class="sub-menu" aria-expanded="false">
                  <li><a href="apps-invoices-list.html" data-key="t-invoice-list">Invoice List</a></li>
                  <li><a href="apps-invoices-detail.html" data-key="t-invoice-detail">Invoice Detail</a></li>
                </ul>
              </li>
              <li>
                <a href="javascript: void(0);" class="has-arrow">
                  <span data-key="t-contacts">Contacts</span>
                </a>
                <ul class="sub-menu" aria-expanded="false">
                  <li><a href="apps-contacts-grid.html" data-key="t-user-grid">User Grid</a></li>
                  <li><a href="apps-contacts-list.html" data-key="t-user-list">User List</a></li>
                  <li><a href="apps-contacts-profile.html" data-key="t-profile">Profile</a></li>
                </ul>
              </li>
              <li>
                <a href="javascript: void(0);" class="">
                  <span data-key="t-blog">Blog</span>
                  <span class="badge rounded-pill badge-soft-danger float-end" key="t-new">New</span>
                </a>
                <ul class="sub-menu" aria-expanded="false">
                  <li><a href="apps-blog-grid.html" data-key="t-blog-grid">Blog Grid</a></li>
                  <li><a href="apps-blog-list.html" data-key="t-blog-list">Blog List</a></li>
                  <li><a href="apps-blog-detail.html" data-key="t-blog-details">Blog Details</a></li>
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
