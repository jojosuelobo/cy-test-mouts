import { faker } from '@faker-js/faker';

describe('Login', () => {
    let url_api

    before(() => {
        cy.fixture('data.json').then((data) => {
            url_api = data.url_api
        })
    })

    it('should login with valid credentials', () => {
        const email = faker.internet.email()
        const password = 'Pass123@'

        cy.createUser_api(url_api, { email: email, password: password }).then(() => {
            cy.request({
                method: 'POST',
                url: `${url_api}/login`,
                body: {
                    email: email,
                    password: password
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Login realizado com sucesso')
                expect(response.body.authorization).to.exist
            })
        })
    })

    it('not login with invalid credentials', () => {
        const email = faker.internet.email()
        const password = 'Pass123@'
        
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${url_api}/login`,
            body: {
                email: email,
                password: password
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.eq('Email e/ou senha inválidos')
        })
    })
})