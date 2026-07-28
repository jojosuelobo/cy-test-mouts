import { faker } from '@faker-js/faker';

describe('User - Home', () => {
    let url_api

    before(() => {
        cy.fixture('data.json').then((data) => {
            url_api = data.url_api
        })
    })

    beforeEach(() => {
        const email = faker.internet.email()
        const nome = faker.person.fullName()
        const password = faker.internet.password()
        cy.createUser_api(url_api, { email: email, password: password, nome: nome, administrador: 'false' })

        cy.visit('/')
        cy.login(email, password)
    })

    it('adds an item to the list and removes it', () => {
        cy.get('[data-testid="adicionarNaLista"]').first().click()

        cy.get('[class="card-body"]').should('be.visible')
        cy.get('[data-testid="shopping-cart-product-quantity"]').should('have.text', 'Total: 1')

        cy.get('[data-testid="limparLista"]').click()
        cy.get('[data-testid="shopping-cart-empty-message"]').should('be.visible').and('have.text', 'Seu carrinho está vazio')
    })
})