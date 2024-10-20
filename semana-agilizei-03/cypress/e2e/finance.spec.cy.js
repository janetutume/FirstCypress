/// <reference types="cypress" />

import { format , prepareLocalStorage} from '../support/utils'

context('Dev finance agilizei', () => {


    /*hooks
    trechos que executam antes e depois do teste
    before - antes de todos os testes
    beforeEach - antes de cada teste
    after - depois de todos os testes
    afterEach - depois de cada teste */

    beforeEach(() => {
        cy.visit('https://dev-finance.netlify.app/', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        })

       // cy.get('#data-table tbody tr').should('have.length', 0)
    });

    it('Casdastrar entradas', () => {
        cy.get('#transaction .button').click()// id + classe
        cy.get('#description').type('Mesada') // id
        cy.get('[name=amount]').type(12) //atributo
        cy.get('[name=date]').type('2024-03-17') // atributo
        cy.get('button').contains('Salvar').click() // tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 1)
    });

    it('Casdastrar saídas', () => {
        cy.get('#transaction .button').click()// id + classe
        cy.get('#description').type('Mesada') // id
        cy.get('[name=amount]').type(-12) //atributo
        cy.get('[name=date]').type('2024-03-17') // atributo
        cy.get('button').contains('Salvar').click() // tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 1)
    });

    it('Remover entradas e saídas', () => {

        const entrada = 'Mesada'
        const saida = 'kinderOvo'

        cy.get('#transaction .button').click()// id + classe
        cy.get('#description').type(entrada) // id
        cy.get('[name=amount]').type(100) //atributo
        cy.get('[name=date]').type('2024-03-17') // atributo
        cy.get('button').contains('Salvar').click() // tipo e valor

        cy.get('#transaction .button').click()// id + classe
        cy.get('#description').type(saida) // id
        cy.get('[name=amount]').type(-35) //atributo
        cy.get('[name=date]').type('2024-03-17') // atributo
        cy.get('button').contains('Salvar').click() // tipo e valor

        // estratégia 1 : voltar para o elemento pai, e avançar para um td img attr

        cy.get('td.description')
            .contains(entrada)
            .parent()
            .find('img[onclick*=remove]')
            .click()


        // estratégia 2 : buscar todos os irmãos , e buscar o que tem img + attr

        cy.get('td.description')
            .contains(saida)
            .siblings()
            .children('img[onclick*=remove]')
            .click()
    });

    it.only('Remover entradas e saídas 2', () => {

        const entrada = 'Mesada'
        const saida = 'kinderOvo'

        cy.get('#transaction .button').click()// id + classe
        cy.get('#description').type(entrada) // id
        cy.get('[name=amount]').type(200) //atributo
        cy.get('[name=date]').type('2024-03-17') // atributo
        cy.get('button').contains('Salvar').click() // tipo e valor

        cy.get('#transaction .button').click()// id + classe
        cy.get('#description').type(saida) // id
        cy.get('[name=amount]').type(-120) //atributo
        cy.get('[name=date]').type('2024-03-17') // atributo
        cy.get('button').contains('Salvar').click() // tipo e valor

        // estratégia 1 : voltar para o elemento pai, e avançar para um td img attr

        cy.get('td.description')
            .contains(entrada)
            .parent()
            .find('img[onclick*=remove]')
            .click()


        // estratégia 2 : buscar todos os irmãos , e buscar o que tem img + attr

        cy.get('td.description')
            .contains(saida)
            .siblings()
            .children('img[onclick*=remove]')
            .click()
    });

    it('Validar saldo com diversas transações', () => {
        const entrada = 'Mesada'
        const saida = 'kinderOvo'

        /*cy.get('#transaction .button').click()// id + classe
        cy.get('#description').type(entrada) // id
        cy.get('[name=amount]').type(100) //atributo
        cy.get('[name=date]').type('2024-03-17') // atributo
        cy.get('button').contains('Salvar').click() // tipo e valor

        cy.get('#transaction .button').click()// id + classe
        cy.get('#description').type(saida) // id
        cy.get('[name=amount]').type(-35) //atributo
        cy.get('[name=date]').type('2024-03-17') // atributo
        cy.get('button').contains('Salvar').click() // tipo e valor*/

        // capturar as linhas com as transações
        // capturar os textos
        // formatar esses valores das linhas

        // somar os valores de entrada e saída
        // capturar o texto do total
        // comparar a somatoria de entradas e despesas com o total

        let incomes = 0
        let expenses = 0

        cy.get('#data-table tbody tr')
            .each(($el, index, $list) => {

                cy.get($el).find('td.income, td.expense').invoke('text').then(text => {

                    if(text.includes('-')){
                        expenses = expenses + format(text)
                        cy.log(expenses)
                    } else {
                        incomes = incomes + format(text)
                        cy.log(incomes)
                    }
                    })

            })

        cy.get('#totalDisplay').invoke('text').then(text => {
            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses
            cy.log(expectedTotal)

            expect(formattedTotalDisplay).to.equals(expectedTotal)
        })
    })

});