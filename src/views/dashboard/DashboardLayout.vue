<template>
  <h1 class="text-center">後台頁面</h1>

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
            <RouterLink to="/admin" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/products" class="nav-link">商品頁面</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/orders" class="nav-link">訂單頁面</RouterLink>
          </li>
        </ul>
      </div>
      <RouterLink to="/" class="ms-auto btn btn-primary">前台頁面</RouterLink>
    </div>
  </nav>

  <router-view></router-view>
</template>