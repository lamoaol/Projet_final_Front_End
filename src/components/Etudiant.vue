<template>
  <div class="hello d-flex flex-nowrap">
    <MenuBar/>

    <div class="col d-flex flex-wrap">
      <div class="card card-inverse col-12">
        <div class="card-block pt-4">
          <i class="fa fa-user fa-3x mb-2"></i>
          <h5>{{ student.lastName }} {{ student.firstName }}</h5>
          <h6><i class="fa fa-briefcase"></i> {{ student.headline }} à <i>{{ student.industryName }}</i></h6>
          <h6><i class="fa fa-location-arrow"></i> {{ student.locationName }}</h6>

          <table class="table mt-3">
            <thead>
            <tr>
              <th>Poste</th>
              <th>Enterprise</th>
              <th>Année</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="expertise in expertises" :key="expertise.skillId">
              <td>{{ expertise.title }}</td>
              <td>{{ expertise.companyName }}</td>
              <td>{{ expertise.startYear}} <span v-if="expertise.endYear">- {{ expertise.endYear }}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuBar from './MenuBar'

  export default {
    name: 'etudiant',
    components: {MenuBar},
    data () {
      return {
        student: {},
        expertises: {}
      }
    },
    mounted () {
      let studentID = this.$route.params.id
      this.getProfile(studentID)
      this.getProfileExpertise(studentID)
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
