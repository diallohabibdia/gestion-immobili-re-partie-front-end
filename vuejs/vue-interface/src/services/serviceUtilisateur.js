import http from "./auth/axiosAPI"; // Assurez-vous que le chemin est correct

const useUser = () => {
    // Récupère tous les utilisateurs
    const getAllUsers = async () => {
        try {
            const users = await http.get("/utilisateurs"); // Assurez-vous que l'URL est correcte
            console.log('Réponse API:', users.data);
            return users.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs", error);
            throw error; // Propager l'erreur
        }
    };

    // Supprimer un utilisateur
    const deleteUser = async (id) => {
        try {
            await http.delete(`/utilisateurs/${id}`);
            console.log("Utilisateur supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
            throw error; // Propager l'erreur
        }
    };

    // Récupérer un utilisateur par ID
    const getUserById = async (id) => {
        const user = await http.get(`/utilisateurs/${id}`);
        return user.data;
    };

    // Ajouter un utilisateur
    const addUser = async (user) => {
        try {
            await http.post(`/utilisateurs`, user);
            console.log("Utilisateur ajouté avec succès");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur", error);
            throw error; // Propager l'erreur
        }
    };

    // Mettre à jour un utilisateur
    const updateUser = async (id, user) => {
        try {
            await http.put(`/utilisateurs/${id}`, user);
            console.log("Utilisateur mis à jour avec succès");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur", error);
            throw error; // Propager l'erreur
        }
    };

    return { getAllUsers, deleteUser, getUserById, addUser, updateUser };
};

export default useUser;
