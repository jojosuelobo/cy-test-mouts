import { faker } from '@faker-js/faker';

describe('Login', () => {
    let url_api

    before(() => {
        cy.fixture('data.json').then((data) => {
            url_api = data.url_api
        })
    })

    it('logs in with valid credentials', () => {
        const email = faker.internet.email()
        const nome = faker.person.fullName()
        const password = faker.internet.password()
        cy.createUser_api(url_api, { email: email, password: password, nome: nome })

        cy.visit('/')
        cy.login(email, password)

        cy.get('h1').contains(`${nome}`).should('be.visible')
    })

    it('does not log in with invalid credentials', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        cy.visit('/')
        cy.login(email, password)

        cy.contains('Email e/ou senha inválidos').should('be.visible')
    })
})