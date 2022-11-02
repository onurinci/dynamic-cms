<template>
  <div class="vertical-menu">

    <!-- LOGO -->
    <div class="navbar-brand-box">
      <a href="index.html" class="logo logo-dark">
        <span class="logo-sm">
            <img src="assets/images/logo-sm.png" alt="" height="22">
        </span>
        <span class="logo-lg">
            <img src="assets/images/logo-dark.png" alt="" height="20">
        </span>
      </a>

      <a href="index.html" class="logo logo-light">
        <span class="logo-sm">
            <img src="assets/images/logo-sm.png" alt="" height="22">
        </span>
        <span class="logo-lg">
            <img src="assets/images/logo-light.png" alt="" height="20">
        </span>
      </a>
    </div>

    <button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
      <i class="fa fa-fw fa-bars"></i>
    </button>

    <div data-simplebar class="sidebar-menu-scroll">

      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu">
          <li class="menu-title">Menu</li>

          <li>
            <router-link to="/">
              <i class="uil-home-alt"></i><span class="badge rounded-pill bg-primary float-end">01</span>
              <span>Content Builder</span>
            </router-link>
          </li>

          <li>
            <a href="javascript: void(0);" class="has-arrow waves-effect">
              <i class="uil-window-section"></i>
              <span>Sayfalar</span>
            </a>
            <ul class="sub-menu" aria-expanded="true">
              <li>
                <a href="javascript: void(0);" class="has-arrow">Tekli Sayfalar</a>
                <ul class="sub-menu" aria-expanded="true">
                  <li v-for="page in pageData">
                    <router-link :to="`/contentmanager/${page?.pageType}/${page?._id}`">
                      {{ page?.pageTitle }}
                    </router-link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript: void(0);" class="has-arrow">Liste Sayfaları</a>
                <ul class="sub-menu" aria-expanded="true">
                  <li><a href="layouts-horizontal.html">Horizontal</a></li>
                  <li><a href="layouts-hori-topbar-dark.html">Topbar Dark</a></li>
                  <li><a href="layouts-hori-boxed-width.html">Boxed Width</a></li>
                  <li><a href="layouts-hori-preloader.html">Preloader</a></li>
                </ul>
              </li>
            </ul>
          </li>

        </ul>
      </div>
      <!-- Sidebar -->
    </div>
  </div>
</template>

<script setup>
  import axios from "axios";
  import {ref} from "vue";

  let pageData = ref([]);

  const getPages = async () => {
    pageData.value = (await axios.get('http://172.17.20.174:3001/api/builder/getPages'))?.data;
  }

  getPages();
</script>
