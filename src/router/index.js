import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Etudiants from '@/components/Etudiants'
import Etudiant from '@/components/Etudiant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/etudiants',
      name: 'Etudiants',
      component: Etudiants
    },
    {
      path: '/etudiant/:id',
      name: 'Etudiant',
      component: Etudiant
    }
  ]
})
