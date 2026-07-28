import { faker } from '@faker-js/faker'

Cypress.Commands.add('createUser_api', (url, userData = {}) => {
    cy.request({
        failOnStatusCode: false,
        method: 'POST',
        url: `${url}/usuarios`,
        body: {
            nome: userData.nome || faker.person.fullName(),
            email: userData.email || faker.internet.email(),
            password: userData.password || 'Pass123@',
            administrador: userData.administrador || 'true'
        }
    })
})

Cypress.Commands.add('updateUser_api', (url, userData = {}, id) => {
    cy.request({
        failOnStatusCode: false,
        method: 'PUT',
        url: `${url}/usuarios/${id}`,
        body: {
            nome: userData.nome || faker.person.fullName(),
            email: userData.email || faker.internet.email(),
            password: userData.password || password,
            administrador: userData.administrador || 'true'
        }
    })
})
