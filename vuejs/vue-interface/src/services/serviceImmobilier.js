

import http from './auth/axiosAPI';

const useImmobilier = () => {
  const getAllImmobiliers = async () => {
   try{

   const response = await http.get('http://localhost:5000/api/immobiliers'); // Utilisation de l'URL complète du backend
   console.log('Réponse API:', response);
   return response.data;
  } 
  catch (error) {
    console.error("Erreur lors de la récupération des immobiliers", error);
    throw error; // Propager l'erreur pour qu'elle soit capturée dans le composant
  }
};

  return { getAllImmobiliers };
};

export default useImmobilier;
