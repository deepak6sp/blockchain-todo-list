const TodoList = artifacts.require('./TodoList.sol')


contract('TodoList', () => {
    before(async () => {
        this.todoList = await TodoList.deployed()
    })

    it('should display name', async () => {
        const name = await this.todoList.name()
        assert.equal(name, 'deepak')
    })
})