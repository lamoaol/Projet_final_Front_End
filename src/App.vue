<template>
  <div id="app">
    <header>
      <div class="mb-4">
        <div class="px-2 d-inline-block">
          <router-link to="/">
            <div class="text-left site-brand h5">
              <i class="fa fa-infinity h2 text-red-1"></i>
              <span class="ml-2 text-muted">{{ appName }}</span>
            </div>
          </router-link>
        </div>
        <div class="px-3 pt-1 d-inline-block float-right">
          <router-link to="/etudiants">
            <div class="font-weight-bold text-muted h5">
              <i class="fa fa-users mr-2"></i>
              <span>Listes des etudiants</span>
            </div>
          </router-link>
        </div>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        appName: 'Etudiant PRO'
      }
    }
  }
</script>

<style>
  @import "./assets/bootstrap.min.css";
  @import url("https://fonts.googleapis.com/css?family=Pacifico|Work+Sans:700");

  body {
    margin: 0;
    padding-top: 20px;
    background-color: #e9ecef;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  .site-brand {
    font-family: 'Pacifico', cursive;
  }

  .top-3 .top-block {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background: radial-gradient(ellipse at bottom, #afb5bd 0%, #030617 100%);
  }

  .top-3 .lg-block {
    height: 150px;
  }

  .top-3 .md-block {
    height: 75px;
  }

  .top-3 .md-block-2 {
    height: 71px;
  }

  .text-red-1 {
    color: #dc3545;
  }

  .left-nav .list-group-item {
    font-size: 21px;
    margin: 10px 0;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #6c757d !important;
  }

  .left-nav .list-group-item.active {
    border: 0;
    border-radius: 0;
    border-left: 8px solid #dc3545;
    background-color: #dc35452e;
    color: #dc3545 !important;
  }

  .text-head {
    font-family: 'Work Sans', sans-serif;
    font-weight: 700;
  }
</style>
