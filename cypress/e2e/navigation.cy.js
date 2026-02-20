describe('Tests E2E Navigation', () => {

  const baseUrl = 'http://localhost:3000/tp-test-mock';

  it('Scénario classique', () => {

    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: []
    }).as('getUsers');

    cy.visit(`${baseUrl}/#/`);

    cy.wait('@getUsers');

    cy.contains('Bienvenue sur votre annuaire').should('be.visible');
    cy.contains('Aucun inscrit').should('be.visible');

    cy.contains('nouvelle inscription').click();

    cy.contains('Ajouter un nouvel utilisateur', { timeout: 10000 }).should('be.visible');

    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 201,
      body: { id: 11 }
    }).as('createUser');

    cy.get('#firstName').should('be.visible').type('Marie');
    cy.get('#lastName').should('be.visible').type('Martin');
    cy.get('#dob').should('be.visible').type('1990-01-01');
    cy.get('#email').should('be.visible').type('marie@test.fr');
    cy.get('#city').should('be.visible').type('Angers');
    cy.get('#postalCode').should('be.visible').type('49100');

    cy.get('button').contains("S'inscrire").click();

    cy.wait('@createUser');

    cy.contains('Inscription réussie', { timeout: 10000 }).should('be.visible');
  });



  it('Scénario Erreur 400', () => {

    // ⚠️ PAS de GET ici

    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 400,
      body: {}
    }).as('createUserError');

    cy.visit(`${baseUrl}/#/register`);

    cy.contains('Ajouter un nouvel utilisateur', { timeout: 10000 }).should('be.visible');

    cy.get('#firstName').should('be.visible').type('Jean');
    cy.get('#lastName').should('be.visible').type('Dupont');
    cy.get('#dob').should('be.visible').type('1990-01-01');
    cy.get('#email').should('be.visible').type('marie@test.fr');
    cy.get('#city').should('be.visible').type('Angers');
    cy.get('#postalCode').should('be.visible').type('49100');

    cy.get('button').contains("S'inscrire").click();

    cy.wait('@createUserError');

    cy.contains('Email déjà existant', { timeout: 10000 }).should('be.visible');
  });



  it.skip('Scénario Erreur 500', () => {

    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 500,
      body: {}
    }).as('createUserCrash');

    cy.visit(`${baseUrl}/#/register`);

    cy.contains('Ajouter un nouvel utilisateur', { timeout: 10000 }).should('be.visible');

    cy.get('#firstName').type('Jean');
    cy.get('#lastName').type('Dupont');
    cy.get('#dob').type('1990-01-01');
    cy.get('#email').type('marie@test.fr');
    cy.get('#city').type('Angers');
    cy.get('#postalCode').type('49100');

    cy.get('button').contains("S'inscrire").click();

    cy.wait('@createUserCrash');

    cy.contains('Erreur serveur', { timeout: 10000 }).should('be.visible');
  });

});