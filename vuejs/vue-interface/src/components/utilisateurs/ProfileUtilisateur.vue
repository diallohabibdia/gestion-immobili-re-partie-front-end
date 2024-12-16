<template>
    <main>
        <h1 class="page-title">
            Info sur {{ user.prenom }} {{ user.nom }}
        </h1>
        <div class="card user-card">
            <img :src="user.image" crossorigin="anonymous" class="card-img-top user-img" :alt="`${user.prenom} ${user.nom}`">
            <div class="card-body">
                <p class="card-text"><strong>Nom:</strong> {{ user.nom}}</p>
                <p class="card-text"><strong>Prénom</strong> {{ user.prenom }}</p>
                <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
                <p class="card-text"><strong>Identification:</strong> {{ user.identification }}</p>
                <p class="card-text"><strong>Téléphone:</strong> {{ user.telephone }}</p>
                <p class="card-text"><strong>Ville:</strong> {{ user.ville }}</p>
                <p class="card-text"><strong>Pays de résidence:</strong> {{ user.pays_residence }}</p>
                <p class="card-text"><strong>Adresse:</strong> {{ user.adresse }}</p>
                <p class="card-text"><strong>Contact d'urgence:</strong> {{ user.contact_urgence }}</p>
                <p class="card-text"><strong>Boîte Postale:</strong> {{ user.boite_postale }}</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import useUser from "@/services/serviceUtilisateur";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const { id } = route.params

const user = ref({})

const { getUserById } = useUser()
onBeforeMount(() => {
    getUserById(id).then(res => {
        console.log('res', res)
        user.value = res.data
    })
})
</script>

<style scoped>
/* Style global */
.page-title {
    text-align: center;
    font-size: 2rem;
    color: #4CAF50;
    margin-top: 30px;
}

/* Style pour la carte contenant les informations utilisateur */
.user-card {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

/* Effet de survol sur la carte */
.user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Image de l'utilisateur */
.user-img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 auto 20px;
    display: block;
}

/* Style du corps de la carte */
.card-body {
    padding: 20px;
    color: #555;
}

/* Taille du texte et mise en forme */
.card-text {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 12px;
}

.card-text strong {
    color: #333;
}

/* Ajouter des espacements supplémentaires entre les paragraphes */
.card-body p {
    margin-bottom: 1.5rem;
}

</style>
