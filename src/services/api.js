// src/services/api.js

import axios from "axios";

// URL de base JSONPlaceholder
const PORT = process.env.REACT_APP_SERVER_PORT || 8000;

const BASE_URL = `http://localhost:${PORT}`;

// ==============================
// Récupérer la liste des utilisateurs
// ==============================
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);

    const utilisateurs = response.data.utilisateurs;

    const users = utilisateurs.map((u) => {
      return {
        id: u[0],
        firstName: u[2],
        lastName: u[1],
        email: u[3],
        address: {
          city: u[6]
        }
      };
    });

    return users;

  } catch (error) {
    // On relance l'erreur pour que le composant la gère
    throw error;
  }
};

// ==============================
// Ajouter un nouvel utilisateur
// ==============================
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    // On relance l'erreur pour que le composant la gère
    throw error;
  }
};