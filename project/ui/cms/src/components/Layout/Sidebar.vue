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
                  <li><a href="javascript: void(0);" data-key="t-level-2-1">Level 2.1</a></li>
                  <li><a href="javascript: void(0);" data-key="t-level-2-2">Level 2.2</a></li>
                </ul>
              </li>
              <li>
                <a href="javascript: void(0);" class="has-arrow" data-key="t-level-1-2">Liste Sayfaları</a>
                <ul class="sub-menu" aria-expanded="true">
                  <li><a href="javascript: void(0);" data-key="t-level-2-1">Level 2.1</a></li>
                  <li><a href="javascript: void(0);" data-key="t-level-2-2">Level 2.2</a></li>
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

        </ul>
      </div>
      <!-- Sidebar -->
    </div>
  </div>
  <!-- Left Sidebar End -->
</template>

<script setup>

  import {onMounted} from "vue";

  onMounted(async () => {
    console.log("log sidebar.vue");
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        console.log("log sidebar.vue");
      }
    }
  });

</script>

<style scoped>

</style>
