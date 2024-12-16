<template>
    <main>
        <h1 class="text-center my-4">Liste des utilisateurs</h1>
        <div class="table-container">
            <table class="table table-hover table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Prenom</th>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in listeUsers" :key="user.id">
                        <td>{{ user.prenom }}</td>
                        <td>{{ user.nom }}</td>
                        <td class="d-flex justify-content-around">
                            <button class="btn btn-primary" @click="update(user.id)">Update</button>
                            <button class="btn btn-success" @click="goToProfile(user.id)">Details</button>
                            <button class="btn btn-danger" @click="supprimer(user.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="text-center mt-4">
            <button class="btn btn-primary" @click="goToaddUser">Ajouter un utilisateur</button>
        </div>
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
            console.log('Suppression réussie', res)
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
        .then((res) => {
            listeUsers.value = res.data
            console.log("Bilan des utilisateurs", res.data)
        })
        .catch(err => console.log(err))
})

const goToaddUser = () => router.push('/add-user')

const goToProfile = id => {
    router.push(`/profile/${id}`)
}

</script>

<style scoped>
.table-container {
    margin-top: 20px;
    max-width: 100%;
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th, .table td {
    padding: 10px;
    text-align: left;
    vertical-align: middle;
}

.table-hover tbody tr:hover {
    background-color: #f1f1f1;
}

.table-bordered {
    border: 1px solid #ddd;
}

thead {
    background-color: #343a40;
    color: white;
}

tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
}

tbody tr:nth-child(even) {
    background-color: #ffffff;
}

button {
    margin: 0 5px;
}

button.btn-danger {
    background-color: #dc3545;
}

button.btn-primary {
    background-color: #007bff;
}

button.btn-success {
    background-color: #28a745;
}

button:hover {
    opacity: 0.85;
}

.text-center {
    text-align: center;
}

.my-4 {
    margin-top: 2rem;
    margin-bottom: 2rem;
}
</style>
