<template>
    <div>
      <h1 class="titre" >Liste des biens immobiliers disponibles (salles, appartements, espaces de jeux, terrains...)</h1>
      <div v-if="immobiliers.length" class="immobiliers-list">
        <div v-for="immobilier in immobiliers" :key="immobilier.id" class="immobilier-card">
          <h2>{{ immobilier.Description }}</h2>
          <p><strong>Ville :</strong> {{ immobilier.ville }}</p>
          <p><strong>Pays :</strong> {{ immobilier.pays }}</p>
          <p><strong>Adresse :</strong> {{ immobilier.adresse }}</p>
          <p v-if="immobilier.boite_postale"><strong>Boîte Postale :</strong> {{ immobilier.boite_postale }}</p>
          <p><strong>Prix :</strong> {{ immobilier.prix }} $</p>
        </div>
      </div>
      <p v-else>Aucun bien immobilier trouvé.</p>
    </div>
  </template>
  
  <script>
  import useImmobilier from '@/services/serviceImmobilier'; // Assurez-vous que ce service est correctement défini
  
  export default {
    name: 'ListeDesImmobiliers',
    data() {
      return {
        immobiliers: [], // Stocke la liste des biens immobiliers
      };
    },
    async created() {
      try {
    const immobilierService = useImmobilier();  // Initialisation du service
    const response = await immobilierService.getAllImmobiliers();  // Attendez la réponse de l'API
    
    // Vérifiez la réponse complète
    console.log('Réponse complète de l\'API:', response);

    // Si la réponse contient des données sous une propriété spécifique (par exemple `response.data`), ajustez en conséquence
    this.immobiliers = response.data || []; // Assurez-vous que la structure des données est correcte
    console.log('Immobiliers récupérés:', this.immobiliers); // Vérifiez les données dans la console
  } catch (error) {
    console.error('Erreur lors du chargement des biens immobiliers :', error);
  }
},
  };
  </script>
  
  <style scoped>
/* Style global pour la liste */
.immobiliers-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* Style de chaque carte */
.immobilier-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Effet au survol de la carte */
.immobilier-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Titre de la carte */
.immobilier-card h2 {
  font-size: 1.6rem;
  margin-bottom: 10px;
  color: #333;
}

/* Style des informations à l'intérieur des cartes */
.immobilier-card p {
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
}

.immobilier-card p strong {
  color: #000;
}
</style>

  
