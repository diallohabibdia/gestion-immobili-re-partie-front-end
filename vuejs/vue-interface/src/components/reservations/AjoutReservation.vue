<template>
    <main class="form-container">
        <h1 class="form-title">Faire une réservation</h1>
        <form @submit.prevent="soumettre" enctype="multipart/form-data" class="reservation-form">
            <!-- Sélection du bien immobilier -->
            <div class="form-group">
                <label for="immobilierId" class="form-label">Biens immobiliers</label>
                <select id="immobilierId" class="form-select" v-model="reservation.immobilierId" @change="afficherDetailsImmobilier">
                    <option v-for="immobilier in immobiliers" 
                            :value="immobilier.id" 
                            :key="immobilier.id">
                        {{ immobilier.Description }}
                    </option>
                </select>
            </div>
            <!-- Affichage des détails du bien immobilier sélectionné -->
            <div v-if="immobilierSelectionne">
                <h3>Détails du bien immobilier :</h3>
                <p><strong>Ville :</strong> {{ immobilierSelectionne.ville }}</p>
                <p><strong>Pays :</strong> {{ immobilierSelectionne.pays }}</p>
                <p><strong>Adresse :</strong> {{ immobilierSelectionne.adresse }}</p>
                <p v-if="immobilierSelectionne.boite_postale"><strong>Boîte Postale :</strong> {{ immobilierSelectionne.boite_postale }}</p>
                <p><strong>Prix :</strong> {{ immobilierSelectionne.prix }} $</p>
            </div>

            <!-- Date de début -->
            <div class="form-group">
                <label for="dateDebut" class="form-label">Date de début</label>
                <input type="date" class="form-input" id="dateDebut" v-model="reservation.dateDebut">
            </div>

            <!-- Date de fin -->
            <div class="form-group">
                <label for="dateFin" class="form-label">Date de fin</label>
                <input type="date" class="form-input" id="dateFin" v-model="reservation.dateFin">
            </div>

            <!-- Montant -->
            <div class="form-group">
                <label for="montant" class="form-label">Montant</label>
                <input type="number" class="form-input" id="montant" v-model="reservation.montant" placeholder="Entrez le montant...">
            </div>

            <button type="submit" class="btn btn-submit">Réserver</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useReservation from '@/services/serviceReservation';
import useImmobilier from '@/services/serviceImmobilier';

// Services
const { addReservation } = useReservation();
const { getAllImmobiliers } = useImmobilier();

const router = useRouter();

// Réservation data model
const reservation = ref({
    immobilierId: null,
    dateDebut: null,
    dateFin: null,
    montant: null,
    statut: 'En attente', // Statut par défaut
});

// Liste des biens immobiliers
const immobiliers = ref([]);

// Informations du bien immobilier sélectionné
const immobilierSelectionne = ref(null);

// Soumettre la réservation
const soumettre = () => {
    const formData = new FormData();

    for (let clef in reservation.value) {
        formData.set(clef, reservation.value[clef]);
    }

    console.log("formData", formData);

    // Ajouter la réservation
    addReservation(formData)
        .then(res => {
            console.log('Réservation réussie:', res);
            // Rediriger vers la liste des réservations
            router.push('/liste-reservations');
        })
        .catch(err => {
            console.error('Erreur lors de la réservation:', err);
        });
};


// Charger les biens immobiliers
onBeforeMount(() => {
    getAllImmobiliers()
        .then(res => {
            // Accédez directement à la liste des biens immobiliers
            console.log("Réponse complète:", res);  // Affichez la réponse pour vérifier sa structure
            if (Array.isArray(res.data)) {
                immobiliers.value = res.data; // Assignez directement res.data si c'est un tableau
            } else {
                console.error("Aucune donnée d'immobilier dans la réponse.");
            }
        })
        .catch(err => {
            console.error('Erreur lors du chargement des biens immobiliers :', err);
        });
});

// Fonction pour afficher les détails du bien immobilier sélectionné
const afficherDetailsImmobilier = () => {
    const immobilier = immobiliers.value.find(item => item.id === reservation.value.immobilierId);
    immobilierSelectionne.value = immobilier || null;
};

</script>

<style scoped>
/* Conteneur principal */
.form-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Titre du formulaire */
.form-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20px;
}

/* Formulaire */
.reservation-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Groupes du formulaire */
.form-group {
    display: flex;
    flex-direction: column;
}

/* Étiquette */
.form-label {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #555555;
}

/* Champs de formulaire */
.form-input, 
.form-select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    background: #f9f9f9;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Effet focus */
.form-input:focus, 
.form-select:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

/* Bouton */
.btn-submit {
    padding: 12px 20px;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    background: #4caf50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-submit:hover {
    background: #45a049;
}

/* Responsive */
@media (max-width: 768px) {
    .form-container {
        padding: 15px;
    }

    .form-title {
        font-size: 20px;
    }

    .btn-submit {
        font-size: 16px;
    }
}
</style>
