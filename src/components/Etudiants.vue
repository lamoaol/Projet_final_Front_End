<template>
  <div class="hello d-flex flex-nowrap">
    <MenuBar/>

    <div class="col d-flex flex-wrap">
      <div class="col-12 my-2">
        <a :href="api.base + 'expertises/export'" v-if="!(name&&searchByName.length)" class="btn btn-success float-right">Exporter</a>
      </div>
      <div class="card card-inverse col-12">
        <div class="card-block">
          <div class="col-12 pt-3">
            <h4>Les etudiants</h4>

            <div class="form-group">
              <label for="">Rercherche par nom</label>
              <div class="input-group">
                <input type="text" class="form-control" v-model="name" @change="handleSearchByName">
                <div class="input-text p-2" style="cursor: pointer"><i class="fa fa-search"></i></div>
              </div>
            </div>

            <table class="table">
              <thead>
              <tr>
                <th>#</th>
                <th>Prenom</th>
                <th>Nom</th>
                <th>Location</th>
                <th>Poste</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="student in students" :key="student.profileId">
                <td>
                  <a href="#">
                    <router-link :to="'/etudiant/'+student.profileId" tag="li" class="list-group-item cursor-pointer"
                                 exact-active-class="active">
                      <i class="fa fa-address-card"> voir</i>
                    </router-link>
                  </a>
                </td>
                <td>{{ student.firstName }}</td>
                <td>{{ student.lastName }}</td>
                <td>{{ student.locationName }}</td>
                <td>{{ student.headline }}</td>
              </tr>
              </tbody>
            </table>

            <nav aria-label="Page navigation" v-if="students && students.pageable">
              <ul class="pagination">
                <li class="page-item" :class="{'active': students.pageable.pageNumber === page}"
                    v-for="page in students.totalPages" :key="page">
                  <span class="page-link" v-on:click="toPage(page)">{{ page }}</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuBar from './MenuBar'

  // let _ = require('lodash')
  require('./../api')

  export default {
    name: 'etudiants',
    components: {MenuBar},
    watch: {
      resources: function () {
        /**
         * Apres le contacte de l'API httpResponse est modifie ont l'injecte dans le variable students
         */
      }
    },
    methods: {
      toPage: function (pageNum = 0) {
        this.getProfiles(25, pageNum)
      },
      handleSearchByName: function () {
        this.getSearchByName(this.name)
      }
    },
    data () {
      return {
        name: null,
        resources: {},
        searchByName: {}
      }
    },
    computed: {
      students: function () {
        if (this.name && this.searchByName.length) {
          return this.searchByName
        }

        return this.resources.content
      }
    },
    mounted () {
      /*
       * On appelle l'API /profiles
       */
      this.getProfiles(25)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  @import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>
