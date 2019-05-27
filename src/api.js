import Vue from 'vue'
import axios from 'axios'

Vue.mixin({
  data () {
    return {
      api: {
        cors: 'https://cors-anywhere.herokuapp.com/',
        base: 'http://104.248.172.23:8080/'
      }
    }
  },
  methods: {
    getHttp: function (endpoint, key = false) {
      return axios.get(this.api.cors + this.api.base + endpoint).then(response => {
        this[key] = response.data
      })
    },
    getProfiles: function (size = 500, page = 0) {
      return this.getHttp('profiles?size=' + (size) + '&page=' + (page), 'resources')
    },
    getProfile: function (id) {
      return this.getHttp('profiles/' + id, 'student')
    },
    getProfileExpertise: function (id) {
      return this.getHttp('profiles/' + id + '/expertises', 'expertises')
    },
    getExpertises: function () {
      return this.getHttp('expertises', 'expertises')
    },
    getSearchByName: function (name) {
      return this.getHttp('profiles/by-lastname/' + name, 'searchByName')
    }
  }
})
