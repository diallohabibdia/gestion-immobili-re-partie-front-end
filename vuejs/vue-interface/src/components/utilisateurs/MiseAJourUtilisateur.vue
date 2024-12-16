<template>
    <main>
        <h1>Mettre à jour les infos de {{ user.prenom + ' ' + user.nom }}</h1>
        <form @submit.prevent="soumettre" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="prenom" class="form-label">Prenom</label>
                <input type="text" class="form-control" id="prenom" v-model="user.prenom">
            </div>
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" v-model="user.nom">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="user.email">
            </div>
            <div class="mb-3">
                <label for="identification" class="form-label">Pièce d'identification valide</label>
                <input type="text" class="form-control" id="identification" v-model="user.identification">
            </div>
            <div class="mb-3">
                <label for="ville" class="form-label">Ville de résidence</label>
                <input type="text" class="form-control" id="ville" v-model="user.ville">
            </div>
            <div class="mb-3">
                <label for="pays" class="form-label">Pays de résidence</label>
                <input type="text" class="form-control" id="text" v-model="user.pays_residence">
            </div>
            <div class="mb-3">
                <label for="telephone" class="form-label">Télephone </label>
                <input type="integer" class="form-control" id="telephone" v-model="user.telephone">
            </div>
            <div class="mb-3">
                <label for="mpd" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="mdp" v-model="user.mot_de_passe">
            </div>
            <div class="mb-3">
                <label for="contact_urgence" class="form-label">Personne à contacter en cas d'urgence</label>
                <input type="text" class="form-control" id="contact_urgence" v-model="user.contact_urgence">
            </div>
            <div class="mb-3">
                <label for="boite_postale" class="form-label">Boite Postale</label>
                <input type="text" class="form-control" id="boite_postale" v-model="user.boite_postale">
            </div>
            <div class="mb-3">
                <label for="photo" class="form-label">Photo</label>
                <input type="file" class="form-control" id="image" @change="{ }">
            </div>

            <!-- Ajout des relations  -->

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </main>

</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUser from '@/services/serviceUtilisateur';
//import useDepartment from '@/services/serviceImmobilier'
//import useRole from '@/services/serviceRole'

const { getUserById } = useUser()
// const { getAllRoles } = useRole()
// const { getAllDepartments } = useDepartment()

const router = useRouter()
const route = useRoute()
const { id } = route.params
const user = ref({
    nom: null,
    prenom: null,
    email: null,
    identification: null,
    telephone: null,
    pays_residence: null,
    ville: null,
    adresse: null, 
    boite_postale: null,
    contact_urgence: null,
    mot_de_passe: null,
    image: null,
})

//const departments = ref([])

//Pour les formulaires  contenant les fichiers/photos
const formData = new FormData()
const soumettre = () => {

    for (let clef in user.value) {
        formData.append(clef, user.value[clef])
    }
    console.log('user', formData)
}
onBeforeMount(() => {
    getUserById(id)
        .then(res => user.value = res.data)
        .catch(() => { })

})
</script>
