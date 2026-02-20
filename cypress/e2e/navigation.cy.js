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

    cy.get('form').should('be.visible');
    cy.get('#firstName', { timeout: 10000 }).should('be.visible');
    cy.get('#lastName', { timeout: 10000 }).should('be.visible');

    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 201,
      body: { id: 11 }
    }).as('createUser');

    cy.get('#firstName').type('Marie');
    cy.get('#lastName').type('Martin');
    cy.get('#dob').type('1990-01-01');
    cy.get('#email').type('marie@test.fr');
    cy.get('#city').type('Angers');
    cy.get('#postalCode').type('49100');

    cy.get('button').contains("S'inscrire").click();

    cy.wait('@createUser');

    cy.contains('Inscription réussie').should('be.visible');
  });



  it('Scénario Erreur 400', () => {

    cy.visit(`${baseUrl}/#/register`);

    cy.get('form').should('be.visible');
    cy.get('#firstName', { timeout: 10000 }).should('be.visible');
    cy.get('#lastName', { timeout: 10000 }).should('be.visible');

    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 400,
      body: {}
    }).as('createUserError');

    cy.get('#firstName').type('Jean');
    cy.get('#lastName').type('Dupont');
    cy.get('#dob').type('1990-01-01');
    cy.get('#email').type('marie@test.fr');
    cy.get('#city').type('Angers');
    cy.get('#postalCode').type('49100');

    cy.get('button').contains("S'inscrire").click();

    cy.wait('@createUserError');

    cy.contains('Email déjà existant').should('be.visible');
  });



  it('Scénario Erreur 500', () => {

    cy.visit(`${baseUrl}/#/register`);

    cy.get('form').should('be.visible');

    // 🔥 on s'assure que les champs ne sont PAS désactivés
    cy.get('#firstName', { timeout: 10000 }).should('be.visible').and('not.be.disabled');
    cy.get('#lastName', { timeout: 10000 }).should('be.visible').and('not.be.disabled');

    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 500,
      body: {}
    }).as('createUserCrash');

    cy.get('#firstName').type('Jean');
    cy.get('#lastName').type('Dupont');
    cy.get('#dob').type('1990-01-01');
    cy.get('#email').type('marie@test.fr');
    cy.get('#city').type('Angers');
    cy.get('#postalCode').type('49100');

    cy.get('button').contains("S'inscrire").click();

    cy.wait('@createUserCrash');

    cy.contains('Erreur serveur').should('be.visible');
  });

});