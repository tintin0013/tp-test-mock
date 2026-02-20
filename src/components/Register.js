import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../Form';
import { createUser } from '../services/api';
import './Home.css';

function Register({ onUserAdded }) {

  const navigate = useNavigate();

  const handleSubmitSuccess = async (userData) => {

    try {

      // Appel API POST
      const response = await createUser(userData);

      // Si succès API (201 simulé)
      if (response) {

        // On met à jour le state global App
        if (onUserAdded) {
          onUserAdded(userData);
        }

        // Message succès
        toast.success("Inscription réussie !");

        // Redirection vers l'accueil après 2 secondes
        setTimeout(() => {
          navigate('/');
        }, 2000);

      }

    } catch (error) {

      // Gestion erreur métier 400
      if (error.response && error.response.status === 400) {
        toast.error("Email déjà existant");
      }

      // Gestion crash serveur 500
      else if (error.response && error.response.status === 500) {
        toast.error("Erreur serveur. Veuillez réessayer plus tard.");
      }

      // Autres erreurs
      else {
        toast.error("Erreur inattendue.");
      }

    }
  };

  return (
    <div className="App">
      <header className="Home-header">
        <h1>Ajouter un nouvel utilisateur</h1>
      </header>

      <Form onSubmitSuccess={handleSubmitSuccess} />

      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Register;