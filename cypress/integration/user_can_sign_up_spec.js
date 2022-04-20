describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
  it("a user cannot register without a password", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  
  });
  it("a user cannot register without an empty password", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type(" ");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  
  });

  it("a user cannot register without an empty email", () => {
    cy.visit("/users/new");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/users/new");
  
  });

  it("a user cannot register without an empty email", () => {
    cy.visit("/users/new");
    cy.get("#email").type(" ");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/users/new");
  
  });
});
