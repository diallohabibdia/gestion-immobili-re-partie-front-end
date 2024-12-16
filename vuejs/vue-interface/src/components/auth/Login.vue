<template>
    <main>
        <form @submit.prevent="connecter">
        <div class="welcome" >
                <label  >Bienvenue sur la page de connexion...</label>
                
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="loginInfo.email">
            </div>
            <div class="mb-3">
                <label for="mpd" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="mdp" v-model="loginInfo.mot_de_passe">
            </div>
            <button type="submit" class="btn btn-primary">Se connecter</button>
            <RouterLink to="/add-user">Nouveau? Creer un compte.</RouterLink>
        </form>
    </main>

</template>

<script setup>
import { ref, watchEffect } from "vue";

import useAuth from '@/services/auth/serviceAuth'
import { useRouter } from "vue-router";
import useAuthStore from '@/stores/auth/authStore'
const { login } = useAuth()

const { setUser, setToken } = useAuthStore()

// Les regx pour la validation

const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// const user = ref({})
const loginInfo = ref({
    email: null,
    mot_de_passe: null
})

const router = useRouter()
const connecter = () => {
    login(loginInfo.value).then(res => {

        setToken(res.token)
        setUser(res.data)
        router.push('/')
    }).catch(err => {

        //En cas d'erreurs au backend, recuperer les erreurs provenant du backend et les afficher sur le formulaire
        const bakendErrors = err.response.data.errors
        //Creer un objet pour mettre les erreurs du backend dans le meme format que la variable errors (declares plus haut)
        const backendError = {}

        for (let error of bakendErrors) {
            backendError[error.path] = error.msg
        }

        // Copier les erreurs du backend mises en forme dans la variable errors
        erreurs.value = { ...erreurs.value, ...backendError }

        router.push('/login')
        console.log('Erreur connexion', err)
    })
}

</script>
<style scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Centre verticalement */
    background-color: #f9f9f9; /* Couleur de fond légère */
    font-family: Arial, sans-serif;
}

form {
    background: #ffffff; /* Fond blanc pour le formulaire */
    padding: 2rem; /* Espacement interne */
    border-radius: 10px; /* Bords arrondis */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ombre subtile */
    width: 100%;
    max-width: 400px; /* Largeur maximale */
}

.welcome {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
}

.mb-3 label {
    font-weight: bold;
    color: #555;
}

input.form-control {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0.75rem;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;
}

input.form-control:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}

button.btn-primary {
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease-in-out;
}

button.btn-primary:hover {
    background-color: #0056b3;
}

a {
    display: block;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #007BFF;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
}

a:hover {
    color: #0056b3;
}

</style>
