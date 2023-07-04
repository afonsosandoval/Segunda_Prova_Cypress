const token = 'ATTA4938d59d96ce176795927ca8195a211f27a1d2dd113edfcb50b2af142ffbaf74B56A94A4';
const key = 'eaa78d6bb0dfd6297adcc72ecf80cd5f';
let idBoard;
let idcard;
let idList;
let nome = '';
let arrayList;
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
            url: 'https://api.trello.com/1/boards/?name=' + board + '&key=' + key + '&token=' + token
        }).then((res) => {
           expect(res.status).to.be.equal(200)
           expect(res.body).is.not.empty
           expect(res.body).to.have.property('id')
           expect(res.body.name).to.be.equal(board)
           idBoard = res.body.id;
        }

        )
    })
    it('buscar idlist do board cadastrado', ()=> {
        cy.request({
            method: 'GET',
            url: 'https://api.trello.com/1/boards/'+ idBoard + '/lists?fields=name&key=' + key + '&token=' + token
        }).then((res) => {
           expect(res.status).to.be.equal(200)
           arrayList = res.body
           arrayList.forEach((item) => {
            const { id, name } = item; // Destructure the object properties
            if(item.name == 'To Do'){
                idcard = item.id
            }
        });
        }
        )
    })
    it('Excluir board gerado', ()=> {

        cy.request({
            method: 'DELETE',
            url: 'https://api.trello.com/1/boards/' + idBoard + '?key=' + key + '&token=' + token
        }).then((res) => {
           expect(res.status).to.be.equal(200)
           arrayList = res.body
           cy.log('lista',arrayList)
        }

        )
        
    })
})
