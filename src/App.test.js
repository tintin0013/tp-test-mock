import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import axios from 'axios';

jest.mock('axios');

// 🔥 Mock de react-toastify
const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();

jest.mock('react-toastify', () => ({
  toast: {
    success: (...args) => mockToastSuccess(...args),
    error: (...args) => mockToastError(...args),
  },
  ToastContainer: () => <div data-testid="toast-container" />
}));

/**
 * @function App
 */

describe('App - Architecture API Mockée', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche la page d’accueil avec les utilisateurs mockés (GET 200)', async () => {

    axios.get.mockResolvedValue({
      data: { utilisateurs: [] }
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Bienvenue sur votre annuaire/i)).toBeInTheDocument();
      expect(screen.getByText(/Aucun inscrit/i)).toBeInTheDocument();
    });

  });


  it('navigue vers la page inscription', async () => {

    axios.get.mockResolvedValue({ data: { utilisateurs: [] } });

    render(<App />);

    await userEvent.click(screen.getByRole('link', { name: /nouvelle inscription/i }));

    expect(screen.getByText(/Ajouter un nouvel utilisateur/i)).toBeInTheDocument();

  });


  it('POST 201 → inscription réussie + redirection', async () => {

    axios.get.mockResolvedValue({ data: { utilisateurs: [] } });

    axios.post.mockResolvedValue({
      data: { id: 11 }
    });

    render(<App />);

    await userEvent.click(screen.getByRole('link', { name: /nouvelle inscription/i }));

    await userEvent.type(screen.getByLabelText(/Prénom/i), 'Marie');
    await userEvent.type(screen.getByLabelText(/Nom de famille/i), 'Martin');
    await userEvent.type(screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    await userEvent.type(screen.getByLabelText(/Email/i), 'marie@test.fr');
    await userEvent.type(screen.getByLabelText(/Ville/i), 'Angers');
    await userEvent.type(screen.getByLabelText(/Code postal/i), '49100');

    await userEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockToastSuccess).toHaveBeenCalledWith("Inscription réussie !");
    });

  });


  it('POST 400 → email déjà existant', async () => {

    axios.get.mockResolvedValue({ data: { utilisateurs: [] } });

    axios.post.mockRejectedValue({
      response: { status: 400 }
    });

    render(<App />);

    await userEvent.click(screen.getByRole('link', { name: /nouvelle inscription/i }));

    await userEvent.type(screen.getByLabelText(/Prénom/i), 'Marie');
    await userEvent.type(screen.getByLabelText(/Nom de famille/i), 'Martin');
    await userEvent.type(screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    await userEvent.type(screen.getByLabelText(/Email/i), 'marie@test.fr');
    await userEvent.type(screen.getByLabelText(/Ville/i), 'Angers');
    await userEvent.type(screen.getByLabelText(/Code postal/i), '49100');

    await userEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockToastError).toHaveBeenCalledWith("Email déjà existant");
    });

  });


  it('POST 500 → crash serveur géré proprement', async () => {

    axios.get.mockResolvedValue({ data: { utilisateurs: [] } });

    axios.post.mockRejectedValue({
      response: { status: 500 }
    });

    render(<App />);

    await userEvent.click(screen.getByRole('link', { name: /nouvelle inscription/i }));

    await userEvent.type(screen.getByLabelText(/Prénom/i), 'Marie');
    await userEvent.type(screen.getByLabelText(/Nom de famille/i), 'Martin');
    await userEvent.type(screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    await userEvent.type(screen.getByLabelText(/Email/i), 'marie@test.fr');
    await userEvent.type(screen.getByLabelText(/Ville/i), 'Angers');
    await userEvent.type(screen.getByLabelText(/Code postal/i), '49100');

    await userEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockToastError).toHaveBeenCalledWith("Erreur serveur. Veuillez réessayer plus tard.");
    });

  });

});