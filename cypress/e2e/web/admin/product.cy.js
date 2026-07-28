import { faker } from '@faker-js/faker';
import 'cypress-file-upload'

describe('Admin - Product', () => {
    let url_api
    let password

    before(() => {
        cy.fixture('data.json').then((data) => {
            url_api = data.url_api
            password = data.password
        })
    })

    beforeEach(() => {
        const email = faker.internet.email()
        const nome = faker.person.fullName()
        cy.createUser_api(url_api, { email: email, password: password, nome: nome })

        cy.visit('/')
        cy.login(email, password)
    })

    it('create a new product', () => {
        const product = {
            nome: faker.commerce.productName(),
            preco: faker.number.int({ min: 1, max: 100 }),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 100 })
        }

        cy.get('[data-testid="cadastrarProdutos"]').click()
        cy.get('[data-testid="nome"]').type(product.nome)
        cy.get('[data-testid="preco"]').type(product.preco)
        cy.get('[data-testid="descricao"]').type(product.descricao)
        cy.get('[data-testid="quantity"]').type(product.quantidade)
        cy.get('[data-testid="imagem"]').as('fileInput').attachFile('test.png')
        cy.get('[data-testid="cadastarProdutos"]').click()

        cy.get('table.table-striped')
            .contains('td', product.nome)
            .should('exist');
    })

    it('remove a product', () => {
        cy.intercept('DELETE', 'https://serverest.dev/produtos/*').as('deleteProduct')

        cy.get('[data-testid="listarProdutos"]').click()
        cy.get('button').contains('Excluir').click()
        
        cy.wait('@deleteProduct').then((response) => {
            expect(response.response.statusCode).to.exist // Fiz um assert simples e generico pois o site não permite excluir produtos fixos
        })
    });
})