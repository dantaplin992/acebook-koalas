describe('Navigation bar', () => {
  it('appears on the homepage', () => {
    cy.visit("/")
    cy.contains('div', 'Navigation').should("have.attr", "class", "nav-bar")
  })

  it('has a link to the home page', () => {
      // sign up
      cy.visit("/users/new");
      cy.get('#first-name').type('Bill')
      cy.get('#surname').type('Smith')
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
  
      // sign in
      cy.visit("/sessions/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      cy.visit('/posts')
      cy.get('.nav-bar').children().eq(0).click()
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/')
      })
  })

  it('has a link to the posts page', () => {
      // sign up
      cy.visit("/users/new");
      cy.get('#first-name').type('Bill')
      cy.get('#surname').type('Smith')
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
  
      // sign in
      cy.visit("/sessions/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      cy.visit('/')
      cy.get('.nav-bar').children().eq(1).click()
      cy.url().should('eq', 'http://localhost:3000/posts')
  })

  it('has a link to the login page', () => {
      // sign up
      cy.visit("/users/new");
      cy.get('#first-name').type('Bill')
      cy.get('#surname').type('Smith')
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
  
      // sign in
      cy.visit("/sessions/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      cy.visit('/')
      cy.get('.nav-bar').children().eq(2).click()
      cy.url().should('eq', 'http://localhost:3000/sessions/new')
  })
})