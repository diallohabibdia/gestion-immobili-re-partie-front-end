<template>
    <main>
        <h1>Liste des users</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Prenom</th>
                    <th>Nom</th>
                    <th>Date de naissance</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in listeUsers" :key="user.id">
                    <td>{{ user.prenom }}</td>
                    <td>{{ user.nom }}</td>
                    <td>{{ user.date_de_naissance }}</td>
                    <td>{{ user.email }} </td>
                    <!-- <img :src="user.photo" alt="photo" crossorigin="anonymous"></td> -->
                    <td><button class="btn btn-primary" @click="update(user.id)">Update</button>
                        <button class="btn btn-success" @click="goToProfile(user.id)">Details</button>
                        <button class="btn btn-danger" @click="supprimer(user.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <button class="btn btn-primary" @click="goToaddUser">Ajouter une personne</button> -->
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useUser from '../../services/serviceUtilisateur'
import { useRouter } from "vue-router";
const { getAllUsers, deleteUser } = useUser()

const listeUsers = ref([])
const router = useRouter()

const supprimer = id => {
    deleteUser(id)
        .then((res) => {
            console.log('suppression', res)
            getAllUsers()
                .then((res) => listeUsers.value = res.data)
                .catch(err => console.log(err))
        })

        .catch(err => console.log(err))
}
const update = (id) => {
    router.push(`/update-user/${id}`)
}
onBeforeMount(() => {
    getAllUsers()
        .then((res) => listeUsers.value = res.data)
        .catch(err => console.log(err))
})

const goToaddUser = () => router.push('/add-user')

const goToProfile = id => {
    router.push(`/profile/${id}`)
}

</script>
<style scoped>
img {
    max-width: 100%;
    width: 10%;
    /* height: 20%; */
}
</style>
