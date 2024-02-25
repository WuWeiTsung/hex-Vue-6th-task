<script>
export default {
  // import { RouterView } from 'vue-router'
}
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <h1 class="text-center">前台頁面</h1>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="navbar-brand" href="#">HEX主線</div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            <RouterLink to="/" class="nav-link">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="nav-link">產品頁</RouterLink>
          </li>
          <li class="nav-item ">
            <RouterLink to="/cart" class="nav-link">購物車</RouterLink>
          </li>
        </ul>

        <RouterLink to="/login" class="ms-auto btn btn-primary">後台頁面</RouterLink>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<style></style>
