import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListeDesUtilisateurs from '@/components/utilisateurs/ListeDesUtilisateurs.vue'
import ProfileUtilisateur from '@/components/utilisateurs/ProfileUtilisateur.vue'
import AjoutUtilisateur from '@/components/utilisateurs/AjoutUtilisateur.vue'
import MiseAJourUtilisateur from '@/components/utilisateurs/MiseAJourUtilisateur.vue'
import ListeDesImmobiliers from '@/components/immobiliers/ListeDesImmobiliers.vue'
import Login from '@/components/auth/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/utilisateurs',
      name: 'ListeUtilisateur',
      component: ListeUtilisateurs
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileUtilisateur
    },
    {
      path: '/add-user',
      name: 'add-user',
      component: AjoutUtilisateur
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/update-user/:id',
      name: 'update-user',
      component: MiseAJourUtilisateur
    },
    {
      path: '/immobiliers',
      name: 'Immobiliers',
      component: ListeDesImmobiliers
    },
    
    {
      path: '/reservations',
      name: 'AjoutReservation',
      component: AjoutReservation
    },
    {
      path: '/liste-reservations',
      name: 'ListeReservations',
      component: ListeReservations
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})


// Liste des routes non protegees
import useAuthStore from '@/stores/auth/authStore'
import AjoutReservation from '@/components/reservations/AjoutReservation.vue'
import ListeUtilisateurs from '@/components/utilisateurs/ListeUtilisateurs.vue'
import ListeReservations from '@/components/reservations/ListeReservations.vue'
const routeOuvertes = ['login', 'add-user', 'immobiliers']

/*router.beforeEach((to, from, next) => {
  const { currentToken: token } = useAuthStore()
  if (routeOuvertes.includes(to.name.toLowerCase()) && token) next({ name: 'home' })
  if (!routeOuvertes.includes(to.name.toLowerCase()) && !token) next({ name: 'login' })
  else next()
})*/

export default router
