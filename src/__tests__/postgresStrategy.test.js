const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_CLIENTE_CADASTRAR = {
    nome: "João",
    profissao: "Pintor"
}
describe('Postgres Strategy', function() {
    /* 
        Como estamos trabalhando com banco de dados,
        pode ser que a conexão demore um pouco, para isso
        definimos o timeout
    
    */
    this.timeout(Infinity)

    this.beforeAll(async function(){
        await context.connect()
    })

    it('PostgresSQL Connection',  async function () {
        const result = await context.isConnected()

        assert.deepStrictEqual(result, true)
    })

    it('cadastrar', async function (){
        const result = await context.create(MOCK_CLIENTE_CADASTRAR)
        
        /* Como o resultado retorna o id junto, e para nosso teste 
        é irrelevante, nós deletamos essa chave*/
        delete result.id
        console.log('result',result)
        assert.deepStrictEqual(result, MOCK_CLIENTE_CADASTRAR)
    })
})