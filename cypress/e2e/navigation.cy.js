describe('Tests E2E Navigation', () => {

  it('Scénario classique', () => {

    // Mock GET initial vide
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: []
    }).as('getUsers');

    cy.visit('http://localhost:3000/#/');

    cy.wait('@getUsers');

    cy.contains('Bienvenue sur votre annuaire').should('be.visible');
    cy.contains('Aucun inscrit').should('be.visible');

    // Navigation vers formulaire
    cy.contains('nouvelle inscription').click();
    cy.url().should('include', '/register');
    cy.contains('Ajouter un nouvel utilisateur').should('be.visible');

    // Mock POST succès
    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 201,
      body: { id: 11 }
    }).as('createUser');

    // Remplissage formulaire
    cy.get('#firstName').type('Marie');
    cy.get('#lastName').type('Martin');
    cy.get('#dob').type('1990-01-01');
    cy.get('#email').type('marie@test.fr');
    cy.get('#city').type('Angers');
    cy.get('#postalCode').type('49100');

    cy.get('button').contains('S\'inscrire')
      .should('not.be.disabled')
      .click();

    cy.wait('@createUser');

    cy.contains('Inscription réussie').should('be.visible');

  });



  it('Scénario Erreur 400', () => {

    // Mock GET vide
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: []
    }).as('getUsers');

    cy.visit('http://localhost:3000/#/register');

    // ️ SUPPRIMÉ cy.wait('@getUsers') car /register ne fait pas de GET

    cy.contains('Ajouter un nouvel utilisateur').should('be.visible');

    // Mock POST erreur 400
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

    cy.get('button').contains('S\'inscrire')
      .should('not.be.disabled')
      .click();

    cy.wait('@createUserError');

    cy.contains('Email déjà existant').should('be.visible');

  });



  it('Scénario Erreur 500', () => {

    // Mock GET vide
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: []
    }).as('getUsers');

    cy.visit('http://localhost:3000/#/register');

    //  SUPPRIMÉ cy.wait('@getUsers') car /register ne fait pas de GET

    cy.contains('Ajouter un nouvel utilisateur').should('be.visible');

    // Mock POST erreur 500
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

    cy.get('button').contains('S\'inscrire')
      .should('not.be.disabled')
      .click();

    cy.wait('@createUserCrash');

    cy.contains('Erreur serveur').should('be.visible');

  });

});