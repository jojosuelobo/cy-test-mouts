import { faker } from '@faker-js/faker';

describe('Login', () => {
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

    it('should login with valid credentials', () => {
        const email = faker.internet.email()
        const nome = faker.person.fullName()
        cy.createUser_api(url_api, { email: email, password: password, nome: nome })

        cy.visit(url_web)
        cy.get('[data-testid="email"]').type(email)
        cy.get('[data-testid="senha"]').type(password)
        cy.get('[data-testid="entrar"]').click()

        cy.get('h1').contains(`${nome}`).should('be.visible')
    })

    it('should login with invalid credentials', () => {
        const email = faker.internet.email()

        cy.visit(url_web)
        cy.get('[data-testid="email"]').type(email)
        cy.get('[data-testid="senha"]').type(password)
        cy.get('[data-testid="entrar"]').click()

        cy.contains('Email e/ou senha inválidos').should('be.visible')
    })
})