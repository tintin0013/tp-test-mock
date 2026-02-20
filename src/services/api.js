// src/services/api.js

import axios from "axios";

// URL de base JSONPlaceholder
const BASE_URL = "https://jsonplaceholder.typicode.com";

// ==============================
// Récupérer la liste des utilisateurs
// ==============================
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
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