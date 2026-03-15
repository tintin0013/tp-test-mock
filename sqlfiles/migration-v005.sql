USE ynov_ci;

ALTER TABLE utilisateur
ADD UNIQUE (email);

INSERT INTO utilisateur (nom, prenom, email, date_naissance, pays, ville, code_postal)
VALUES ('Professeur', 'Tournesol', 'professeur.tournesol@test.com', '1912-09-14', 'France', 'cassis', '13022');