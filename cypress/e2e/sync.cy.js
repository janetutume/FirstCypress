/// <reference types="cypress" />

before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

beforeEach(() => {
    cy.reload()
})

it('Deve aguardar elemento estar disponível', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('funciona')

})

it('Deve fazer retrays', () => {
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo')
    .should('exist')
    .type('funciona')

})

it('Uso do find', () => {
    cy.get('#buttonList').click()

    cy.get('#lista li')
    .find('span')
    .should('contain', 'Item 1')

    cy.get('#lista li')
    .find('span')
    .should('contain', 'Item 2')

    //cy.get('#lista li span')
    //should('contain', 'Item 2') // mesmo resultado no com o find anterior

})

it('Timeout', () => {
    //cy.get('#buttonDelay').click()
    //cy.get('#novoCampo')
    //.should('exist')

    //cy.get('#buttonListDOM').click()
    //cy.wait(5000)
    //cy.get('#lista li span', { timeout: 30000})
    //.should('contain', 'Item 2')

    cy.get('#buttonListDOM').click()
    cy.get('#lista li span')
    .should('have.length', 1)
    cy.get('#lista li span')
    .should('have.length', 2)

})

it.only('Should VS Then', () => {
    //cy.get('#buttonListDOM').click()
    cy.get('#buttonListDOM').should($el => {
        //.should('have.length', 1)
        //console.log($el)
        expect($el).to.have.length(1)
        return 2
        //cy.get('#buttonList')
    }).and('have.id', 'buttonListDOM')

})//#lista li span