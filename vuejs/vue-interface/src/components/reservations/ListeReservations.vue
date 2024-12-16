<template>
    <div>
      <h1 class="titre">Liste des réservations</h1>
      <div v-if="reservations.length" class="reservations-liste">
        <div v-for="reservation in reservations" :key="reservation.id" class="reservation-card">
          <!-- Statut de la réservation -->
          <h2>{{ reservation.statut }}</h2>
          
          <!-- Dates de la réservation -->
          <p><strong>Date de début:</strong> {{ reservation.dateDebut }}</p>
          <p><strong>Date de fin:</strong> {{ reservation.dateFin }}</p>
          
          <!-- Montant -->
          <p><strong>Montant:</strong> {{ reservation.montant }} $</p>
          
          <!-- Utilisateur ayant effectué la réservation -->
          <div v-if="reservation.utilisateur">
            <h3>Réservé par :</h3>
            <p><strong>Prenom:</strong> {{ reservation.utilisateur.prenom }}</p>
            <p><strong>Nom:</strong> {{ reservation.utilisateur.nom }}</p>
            <p><strong>Email:</strong> {{ reservation.utilisateur.email }}</p>
          </div>
          
          <!-- Informations sur le bien immobilier -->
          <div v-if="reservation.Immobilier">
            <h3>Informations sur le bien :</h3>
            <p><strong>Description:</strong> {{ reservation.Immobilier.description }}</p>
            <p><strong>Ville:</strong> {{ reservation.Immobilier.ville }}</p>
            <p><strong>Pays:</strong> {{ reservation.Immobilier.pays }}</p>
            <p><strong>Adresse:</strong> {{ reservation.Immobilier.adresse }}</p>
          </div>
          <p v-else>Informations sur l'immobilier non disponibles.</p>
        </div>
      </div>
      <p v-else>Aucune réservation trouvée.</p>
    </div>
  </template>
  
  <script>
  import useReservation from "@/services/serviceReservation"; // Service API des réservations
  export default {
    name: "ListeDesReservations",
    data() {
      return {
        reservations: [], // Stocke les réservations récupérées
      };
    },
    async created() {
      try {
        const reservationService = useReservation(); // Instanciation du service
        this.reservations = await reservationService.getAllreservations(); // Appel à l'API
        console.log("Réservations récupérées :", this.reservations);
      } catch (error) {
        console.error("Erreur lors du chargement des réservations :", error);
      }
    },
  };
  </script>
  
  <style scoped>
/* Titre principal */
.titre {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Conteneur de la liste des réservations */
.reservations-liste {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  padding: 20px;
  background-color: #ecf0f1;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Carte de réservation */
.reservation-card {
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.reservation-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Titre de chaque réservation */
.reservation-card h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #2980b9;
  font-weight: bold;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
}

/* Sous-sections (utilisateur, immobilier) */
.reservation-card h3 {
  font-size: 1.4rem;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #34495e;
  text-transform: uppercase;
  font-weight: bold;
}

/* Paragraphes */
.reservation-card p {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.5;
  margin: 5px 0;
}

.reservation-card p strong {
  color: #2c3e50;
}

/* Texte pour l'absence d'informations */
.reservation-card p.vide {
  color: #e74c3c;
  font-style: italic;
}

/* Responsive */
@media (max-width: 768px) {
  .reservations-liste {
    grid-template-columns: 1fr;
  }

  .reservation-card {
    padding: 15px;
  }

  .titre {
    font-size: 2rem;
  }
}
</style>
