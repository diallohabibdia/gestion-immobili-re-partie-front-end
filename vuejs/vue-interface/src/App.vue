<script setup>
import { RouterLink, RouterView } from 'vue-router'
import useAuthStore from './stores/auth/authStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const store = useAuthStore()
const { logout } = store

//Pour la reactivite des getters, on utilise storeToRefs
const { currentUser: loggedInUser } = storeToRefs(store)
const router = useRouter()
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
  <img src="/AHW_Immobilier_logo.png" alt="Logo" class="logo" />
</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
          aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
            </li>
            <li class="nav-item" v-if="loggedInUser?.id">
              <RouterLink class="nav-link" :to="`/profile/${loggedInUser?.id}`">Profile</RouterLink>
            </li>
            <li class="nav-item dropdown">
              <RouterLink class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false"> Menu
              </RouterLink>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <RouterLink class="dropdown-item" to="/immobiliers">Consulter nos biens immobiliers</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="#">Consulter nos équipements disponibles</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/utilisateurs">Liste des utilisateurs </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/reservations">Faire une reservation </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/liste-reservations">Liste des reservations </RouterLink>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="#">A propos de Nous</RouterLink>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex align-items-center gx-20">
            <div class="p-2" v-if="loggedInUser?.id">Bienvenu {{ loggedInUser.prenom + ' ' + loggedInUser.nom }}</div>
            <button v-else @click="router.push('/login')" class="btn btn-outline-success">Login</button>
            <button v-if="loggedInUser?.id" @click="logout" class="btn btn-danger ml-2">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  /* max-height: 100vh; */
}


nav {
  width: 100%;
  font-size: 12px;
  /* text-align: center; */
  margin-bottom: 2rem;
}
/* Style de la liste déroulante */
.dropdown-menu {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  min-width: 200px;
  margin-top: 10px;
  transition: all 0.3s ease-in-out;
}

/* Style pour les éléments du menu déroulant */
.dropdown-item {
  color: #333;
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
/* Effet de survol sur les éléments du menu */
.dropdown-item:hover {
  background-color: #007BFF;
  color: white;
  cursor: pointer;
}

/* Séparateur de menu */
.dropdown-divider {
  margin: 8px 0;
  border-top: 1px solid #ddd;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
