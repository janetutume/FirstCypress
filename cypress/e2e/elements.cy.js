/// <reference types="cypress" />>

describe('Work with basic elements', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {

        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')

    })

    it('links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', "Voltou!")

        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', "Voltou!")
    })

    it('Text field', () => {
       cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')
        //cy.wait(10000)
        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')
    })

    it('Radio Button' , () => {
        cy.get('#formSexoFem')
        .click()
        .should('be.checked')

        cy.get('#formSexoMasc')
        .should('not.be.checked')

        cy.get("[name='formSexo']").should('have.length', 2)
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
        .click()
        .should('be.checked')

        cy.get('[name=formComidaFavorita]').click({ multiple: true})
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('not.be.checked')
    })

    it('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
        .select('2o grau completo') // para o select, pode ser usado o valor em tela ou o value
        .should('have.value', '2graucomp')
    })

    it.only('Combo multiple', () => {
        cy.get('[data-testid=dataEsportes]')
        .select(['natacao', 'Corrida', 'nada']) // para selecionar por meio de Array, deve utilizar o values
    })
})