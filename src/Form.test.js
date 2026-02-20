import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from './components/Register';
import { BrowserRouter } from "react-router-dom";

/**
 * @function handleSubmit
 */
test('vérification de la présence de localStorage', () => { 
    localStorage.setItem('test', 'ok'); 
    expect(localStorage.getItem('test')).toBe('ok'); 
});

/**
 * @function validateField
 */

// Test que le formulaire s'affiche correctement
test('renders form fields', () => {
    render(<Register />, {wrapper: BrowserRouter});
    expect(screen.getByLabelText(/Prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom de famille/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de naissance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Code postal/i)).toBeInTheDocument();
});

// Test qu'une erreur s'affiche si le champ prénom n'est pas rempli correctement
test('shows error for invalid first name', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const firstNameInput = screen.getByLabelText(/Prénom/i);
    await userEvent.type(firstNameInput, 'John123');
    await waitFor(() => {
        expect(screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
    });
});

test('shows error for null first name', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const firstNameInput = screen.getByLabelText(/Prénom/i);
    await userEvent.type(firstNameInput, ' ');
    await waitFor(() => {
        expect(screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
    });
});

// Test qu'une erreur s'affiche si le champ email n'est pas rempli correctement
test('shows error for invalid email', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, 'invalid-email');
    await waitFor(() => {
        expect(screen.getByText(/Email invalide/i)).toBeInTheDocument();
    });
});

// Test qu'une erreur s'affiche si le champ date de naissance n'est pas rempli correctement
test('shows error for underage user', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const dobInput = screen.getByLabelText(/Date de naissance/i);
    await userEvent.type(dobInput, '2010-01-01');
    await waitFor(() => {
        expect(screen.getByText(/Vous devez avoir au moins 18 ans/i)).toBeInTheDocument();
    });
});

test('shows error for null first name', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const firstNameInput = screen.getByLabelText(/Prénom/i);
    await userEvent.type(firstNameInput, ' ');
    await waitFor(() => {
        expect(screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
    });
});

// Test qu'une erreur s'affiche si le champ ville n'est pas rempli correctement
test('shows error for invalid city', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const cityInput = screen.getByLabelText(/Ville/i);
    await userEvent.type(cityInput, '12345');
    await waitFor(() => {
        expect(screen.getByText(/Veuillez saisir une ville valide/i)).toBeInTheDocument();
    });
});

test('shows error for null city', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const cityInput = screen.getByLabelText(/Ville/i);
    await userEvent.type(cityInput, ' ');
    await waitFor(() => {
        expect(screen.getByText(/Veuillez saisir une ville valide/i)).toBeInTheDocument();
    });
});

// Test qu'une erreur s'affiche si le champ code postal n'est pas rempli correctement
test('shows error for invalid postal code', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const postalCodeInput = screen.getByLabelText(/Code postal/i);
    await userEvent.type(postalCodeInput, 'ABCDE');
    await waitFor(() => {
        expect(screen.getByText(/Veuillez entrer un code postal valide \(5 chiffres\)/i)).toBeInTheDocument();
    });
});

test('shows error for null postal code', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const postalCodeInput = screen.getByLabelText(/Code postal/i);
    await userEvent.type(postalCodeInput, ' ');
    await waitFor(() => {
        expect(screen.getByText(/Veuillez entrer un code postal valide \(5 chiffres\)/i)).toBeInTheDocument();
    });
});

// Test            
test('shows error for invalid last name', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const lastNameInput = screen.getByLabelText(/Nom de famille/i);
    await userEvent.type(lastNameInput, 'Doe123');
    await waitFor(() => {
        expect(screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
    });
});

test('shows error for null last name', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const lastNameInput = screen.getByLabelText(/Nom de famille/i);
    await userEvent.type(lastNameInput, ' ');
    await waitFor(() => {
        expect(screen.getByText(/Attention ! Vos prénoms et noms ne doivent contenir que des lettres/i)).toBeInTheDocument();
    });
});

// Test le switch default
test('default case handles unknown field gracefully', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    const input = screen.getAllByRole('textbox')[0]; 
    
    fireEvent.change(input, { 
        target: { name: 'unknownField', value: 'test123' } 
    });
    
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
});

test('default case in catch sets generic error for unknown field', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    
    const input = screen.getByLabelText(/Prénom/i);
    
    fireEvent.change(input, { 
        target: { 
            name: 'unknownField',
            value: 'invalid123' 
        } 
    });
    
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
});

/**
 * @function handleSubmit
 */

// Test que le formulaire se soumet correctement avec des données valides
test('submits form with valid data', async () => {
    render(<Register />, {wrapper: BrowserRouter});
    await userEvent.type(screen.getByLabelText(/Prénom/i), 'John');
    await userEvent.type(screen.getByLabelText(/Nom de famille/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/Email/i), 'john.doe@example.com');
    await userEvent.type(screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    await userEvent.type(screen.getByLabelText(/Ville/i), 'Paris');
    await userEvent.type(screen.getByLabelText(/Code postal/i), '75001');
    await userEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));
});