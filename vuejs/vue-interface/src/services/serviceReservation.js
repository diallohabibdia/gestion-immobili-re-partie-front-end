import http from './auth/axiosAPI';

const useReservation = () => {
  const getAllreservations = async () => {
   try{

   const response = await http.get('http://localhost:5000/api/reservations'); // Utilisation de l'URL complète du backend
   console.log('Réponse API:', response);
   return response.data;
  } 
  catch (error) {
    console.error("Erreur lors de la récupération des reservations", error);
    throw error; // Propager l'erreur pour qu'elle soit capturée dans le composant
  }
};

// Fonction pour ajouter une nouvelle réservation
const addReservation = async (formData) => {
  try {
      const response = await http.post('http://localhost:5000/api/reservations', formData);
      console.log('Réponse ajout réservation:', response);
      return response.data;
  } catch (error) {
      console.error("Erreur lors de l'ajout de la réservation", error);
      throw error;
  }
};

  return { getAllreservations, addReservation };
};

export default useReservation;
