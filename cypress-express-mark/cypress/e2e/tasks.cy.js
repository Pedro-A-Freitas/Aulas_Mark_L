/// <reference types="cypress" />

describe('tarefas', () => {

    let testData;

    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t
        })

    })

    context('cadastro', () => {

        it('deve cadastrar uma nova tarefa', () => {

            const taskname = 'Ler um Livro de Node.js'
    
            cy.removetaskbyname(taskname)
    
            cy.createtask(taskname)
    
            cy.contains('main div p', taskname)
                .should('be.visible')
    
        })
    
        it('não deve permitir tarefa duplicada', ()=> {
    
            const task = testData.dup
    
            cy.removetaskbyname(task.name)
    
            cy.posttask(task)
    
            cy.createtask(task.name)
    
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
    
        })
    
        it('campo obrigatório', ()=> {
    
            cy.createtask()
    
            cy.isRequired('This is a required field')
    
        })

    })

    context('atualização', () => {
        it('deve concluir uma tarefa', () => {
            const task = {
                name: 'Pagar contas de consumo',
                is_done: false
            }

            cy.removetaskbyname(task.name)
            cy.posttask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')

        })

    })

    context('exclusão', () => {
        it('deve remover uma tarefa', () => {
            const task = {
                name: 'Estudar Javascript',
                is_done: false
            }

            cy.removetaskbyname(task.name)

            cy.posttask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')

        })

    })

})