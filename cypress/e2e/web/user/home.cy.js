import { faker } from '@faker-js/faker';

describe('User - Home', () => {
    let url_api
    let password
    let url_web

    before(() => {
        cy.fixture('data.json').then((data) => {
            url_api = data.url_api
            url_web = data.url_web
            password = data.password
        })
    })

    beforeEach(() => {
        cy.visit(url_web)
        const email = faker.internet.email()
        const nome = faker.person.fullName()
        cy.createUser_api(url_api, { email: email, password: password, nome: nome, administrador: 'false' })

        cy.visit(url_web)
        cy.login(email, password)
    })

    it('add item to list and remove it', () => {
        const item = 'Iphone 17'
        cy.get('[data-testid="pesquisar"]').type(item)
        cy.get('[data-testid="botaoPesquisar"]').click()
        cy.get('[data-testid="adicionarNaLista"]').click()

        cy.get('[class="card-body"]').contains(item).should('be.visible')
        cy.get('[data-testid="shopping-cart-product-quantity"]').should('have.text', 'Total: 1')

        cy.get('[data-testid="limparLista"]').click()
        cy.get('[data-testid="shopping-cart-empty-message"]').should('be.visible').and('have.text', 'Seu carrinho está vazio')
    })
})