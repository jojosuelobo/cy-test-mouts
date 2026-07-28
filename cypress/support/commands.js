Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="senha"]').type(password)
    cy.get('[data-testid="entrar"]').click()
})