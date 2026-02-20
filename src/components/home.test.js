import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';

jest.mock('axios');

describe('Home - appels API mockés', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche les utilisateurs en cas de succès 200', async () => {

    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          firstName: 'Marie',
          lastName: 'Martin',
          email: 'marie@test.fr',
          address: { city: 'Angers' }
        }
      ]
    });

    render(<Home />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText('Marie')).toBeInTheDocument();
      expect(screen.getByText('Martin')).toBeInTheDocument();
      expect(screen.getByText('1 utilisateur(s) inscrit(s)')).toBeInTheDocument();
    });
  });

  it('affiche un message si le serveur renvoie une erreur 500', async () => {

    axios.get.mockRejectedValue({
      response: { status: 500 }
    });

    render(<Home />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(
        screen.getByText('Erreur serveur, impossible de récupérer les utilisateurs.')
      ).toBeInTheDocument();
    });
  });

  it('affiche "Aucun inscrit" si la liste est vide', async () => {

    axios.get.mockResolvedValue({
      data: []
    });

    render(<Home />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(
        screen.getByText('Aucun inscrit pour le moment')
      ).toBeInTheDocument();
    });
  });

});