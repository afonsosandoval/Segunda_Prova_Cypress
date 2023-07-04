const token = 'ATTA4938d59d96ce176795927ca8195a211f27a1d2dd113edfcb50b2af142ffbaf74B56A94A4';
const key = 'eaa78d6bb0dfd6297adcc72ecf80cd5f';
let id;
const board = 'Board_Cypress'
describe('Operações Trello conta Afonso Sandoval', ()=> {

    it('buscar dados do meu board', ()=> {

   

        cy.request({
            method: 'GET',
            url: 'https://api.trello.com/1/members/me/boards?key=' + key + '&token=' + token
        }).then((res) => {
           expect(res.status).to.be.equal(200)
           expect(res.body).is.not.empty
        }

        )
    })
    it('incluir board cadastrado', ()=> {

        cy.request({
            method: 'POST',
            url: 'https://api.trello.com/1/boards/?name=' + board + '&key=' + key + '&token=' + token,
        }).then((res) => {
           expect(res.status).to.be.equal(200)
           expect(res.body).is.not.empty
           expect(res.body).to.have.property('id')
           expect(res.body.name).to.be.equal(board)
           id = res.body.id;
        }

        )
    })

    it('Excluir board gerado', ()=> {

        cy.request({
            method: 'DELETE',
            url: 'https://api.trello.com/1/boards/' + id + '?key=' + key + '&token=' + token
        }).then((res) => {
           expect(res.status).to.be.equal(200)
        }

        )
        
    })
})
