import { useState, useCallback } from 'react';
import validateForm from './module/validator.js';
import './Form.css';

function Form({ onSubmitSuccess }) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    city: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {

    const newErrors = { ...errors };

    try {

      switch (name) {

        case 'firstName':
        case 'lastName':
          if (!value.trim() || !/^[A-Za-zÀ-ÿ\s-]+$/.test(value)) {
            newErrors[name] = 'Attention ! Vos prénoms et noms ne doivent contenir que des lettres';
          } else {
            delete newErrors[name];
          }
          break;

        case 'email':
          if (!value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors[name] = 'Email invalide';
          } else {
            delete newErrors[name];
          }
          break;

        case 'dob':
          if (!value) {
            newErrors[name] = 'Vous devez avoir au moins 18 ans';
          } else {
            delete newErrors[name];
          }
          break;

        case 'city':
          if (!value.trim()) {
            newErrors[name] = 'Veuillez saisir une ville valide';
          } else {
            delete newErrors[name];
          }
          break;

        case 'postalCode':
          if (!/^\d{5}$/.test(value)) {
            newErrors[name] = 'Veuillez entrer un code postal valide (5 chiffres)';
          } else {
            delete newErrors[name];
          }
          break;

        default:
          break;
      }

    } catch (error) {
      newErrors[name] = 'Erreur de validation';
    }

    setErrors(newErrors);

  }, [errors]);

  const isFormValid = useCallback(() => {

    return (
      Object.keys(errors).length === 0 &&
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.dob &&
      formData.city.trim() &&
      /^\d{5}$/.test(formData.postalCode)
    );

  }, [formData, errors]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    validateField(name, value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // 🔥 Sécurité anti double submit
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {

      const age = { birth: new Date(formData.dob) };
      const identity = { name: `${formData.firstName} ${formData.lastName}`.trim() };

      validateForm(
        age,
        formData.postalCode,
        formData.city,
        identity,
        formData.email
      );

      const userData = {
        ...formData,
        fullName: identity.name
      };

      await onSubmitSuccess(userData);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        city: '',
        postalCode: ''
      });

      setErrors({});

    } catch (error) {

      console.error('Erreur finale:', error);

    } finally {

      setIsSubmitting(false);

    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">

        <div className="form-field">
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.firstName ? 'error' : ''}
          />
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Nom de famille :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.lastName ? 'error' : ''}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.email ? 'error' : ''}
          />
        </div>

        <div className="form-field">
          <label htmlFor="dob">Date de naissance :</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            disabled={isSubmitting}
            max={new Date().toISOString().split('T')[0]}
            className={errors.dob ? 'error' : ''}
          />
        </div>

        <div className="form-field">
          <label htmlFor="city">Ville :</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.city ? 'error' : ''}
          />
        </div>

        <div className="form-field">
          <label htmlFor="postalCode">Code postal :</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            disabled={isSubmitting}
            maxLength="5"
            className={errors.postalCode ? 'error' : ''}
          />
        </div>

        <button
          type="submit"
          className="Home-button"
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : "S'inscrire"}
        </button>

      </form>
    </div>
  );
}

export default Form;