<template>
  <div class="text-center bg-white mr-5 left-nav" style="width: 100px;">
    <ul class="list-unstyled mt-4 list-group">
      <router-link to="/" tag="li" class="list-group-item cursor-pointer" exact-active-class="active">
        <i class="fa fa-chart-bar"></i>
      </router-link>
      <router-link to="/etudiants" tag="li" class="list-group-item cursor-pointer" exact-active-class="active">
        <i class="fa fa-users"></i>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'menu'
  }
</script>

<style>
  .cursor-pointer {
    cursor: pointer
  }

  .list-group-item {
    border: 0;
  }
</style>
