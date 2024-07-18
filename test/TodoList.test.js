const TodoList = artifacts.require('./TodoList.sol')


contract('TodoList', () => {
    before(async () => {
        this.todoList = await TodoList.deployed()
    })

    it('should display name', async () => {
        const name = await this.todoList.name()
        assert.equal(name, 'deepak')
    })

    it('should display count', async () => {
        const count = await this.todoList.count()
        assert.equal(count, 1)
    })

    it('should display first item in the list', async () => {
        const list1 = await this.todoList.list(1)
        assert.equal(list1.content, "call doctor")
    })

    it('should display next item in the list', async () => {
        const result = await this.todoList.createTask("call electrician")
        const list2 = await this.todoList.list(2)
        assert.equal(list2.content, "call electrician")
        assert.equal(result.logs[0].args.content, "call electrician")
    })
})