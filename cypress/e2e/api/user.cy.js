import { faker } from '@faker-js/faker';
describe('Users Endpoints', () => {
    let url_api
    let invalid_id = '0uxuPY0cbmQhpEz2'
    const password = 'Pass123@'

    before(() => {
        cy.fixture('data.json').then((data) => {
            url_api = data.url_api
        })
    })

    it('create user', () => {
        cy.createUser_api(url_api).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            expect(response.body._id).to.be.not.null
        })
    })

    it('create already registered user', () => {
        const email = faker.internet.email()

        cy.createUser_api(url_api, { email: email }).then(() => {
            cy.createUser_api(url_api, { email: email }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.eq('Este email já está sendo usado')
            })
        })
    })

    it('get users', () => {
        cy.request({
            method: 'GET',
            url: `${url_api}/usuarios`
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.quantidade).to.be.greaterThan(0)
            expect(response.body.usuarios.length).to.be.greaterThan(0)
            expect(response.body.quantidade).to.be.eq(response.body.usuarios.length)
        })
    });

    it('get user by id', () => {
        const email = faker.internet.email()
        const nome = faker.person.fullName()
        cy.createUser_api(url_api, { email: email, nome: nome }).then((response) => {
            const id = response.body._id
            cy.request({
                method: 'GET',
                url: `${url_api}/usuarios/${id}`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.nome).to.be.eq(nome)
                expect(response.body.email).to.be.eq(email)
                expect(response.body.password).to.be.eq(password)
                expect(response.body.administrador).to.be.eq('true')
            })
        })
    })

    it('get user by invalid id', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${url_api}/usuarios/${invalid_id}`
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq('Usuário não encontrado')
        })
    })

    it('get user with invalid id', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${url_api}/usuarios/invalido`
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.id).to.eq('id deve ter exatamente 16 caracteres alfanuméricos')
        })
    })

    it('update user', () => {
        const emailUpdate = faker.internet.email()
        const nomeUpdate = faker.person.fullName()
        const passwordUpdate = faker.internet.password()
        cy.createUser_api(url_api).then((response) => {
            const id = response.body._id
            cy.updateUser_api(url_api, { email: emailUpdate, nome: nomeUpdate, password: passwordUpdate, administrador: 'false' }, id).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Registro alterado com sucesso')
            }).then(() => {
                cy.request({
                    method: 'GET',
                    url: `${url_api}/usuarios/${id}`
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.nome).to.eq(nomeUpdate)
                    expect(response.body.email).to.eq(emailUpdate)
                    expect(response.body.password).to.eq(passwordUpdate)
                    expect(response.body.administrador).to.eq('false')
                })
            })
        })
    });

    it('update non-existent user', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${url_api}/usuarios/invalido`, // Eu reportaria um bug sobre isso! PUT não tem a validação de 16 caracteres alfanuméricos
            body: {
                nome: faker.person.fullName(),
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('update non-existent user with all fields', () => {
        cy.updateUser_api(url_api, { nome: faker.person.fullName(), email: faker.internet.email(), password: faker.internet.password(), administrador: 'true' }, invalid_id).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            expect(response.body._id).to.be.not.null
        })
    })

    it('delete user', () => {
        cy.createUser_api(url_api).then((response) => {
            const id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `${url_api}/usuarios/${id}`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Registro excluído com sucesso')
            })
        })
    });

    it('delete non-existent user', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${url_api}/usuarios/invalido`
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Nenhum registro excluído')
        })
    })
})